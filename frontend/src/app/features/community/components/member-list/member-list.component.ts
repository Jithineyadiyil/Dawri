import {
  ChangeDetectionStrategy, Component, computed, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunityStateService } from '../../services/community-state.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FriendService, FriendUser, Relationship } from '../../../../core/services/friend.service';
import { DmService } from '../../../social/dm.service';
import { ToastService } from '../../../../core/services/toast.service';
import { CommunityMember, MemberRole, PresenceStatus } from '../../models/community.model';

interface MuteOption { label: string; minutes: number; }

/** Inline confirmation state for destructive actions. */
interface PendingAction {
  type: 'ban' | 'kick';
  member: CommunityMember;
  reason: string;
}

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ml-root" (click)="closeMenu()">

      <!-- ── Header ──────────────────────────────────────────── -->
      <div class="ml-header">
        <div class="ml-header__title">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Members
          <span class="ml-header__total">{{ totalCount() }}</span>
        </div>
        <div class="ml-header__pills">
          <span class="ml-online-pill">
            <span class="ml-online-dot"></span>
            {{ onlineCount() }} online
          </span>
          <button class="ml-filter-btn" [class.active]="showOnlineOnly()" (click)="showOnlineOnly.set(!showOnlineOnly()); $event.stopPropagation()" title="Show online only">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </button>
        </div>
      </div>

      <!-- ── Search ───────────────────────────────────────────── -->
      <div class="ml-search">
        <svg class="ml-search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input
          class="ml-search-input"
          type="text"
          placeholder="Search members…"
          [ngModel]="search()"
          (ngModelChange)="search.set($event)"
          (click)="$event.stopPropagation()"
        />
        @if (search()) {
          <button class="ml-search-clear" (click)="search.set(''); $event.stopPropagation()">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        }
      </div>

      <!-- ── Skeleton ─────────────────────────────────────────── -->
      @if (groups().length === 0) {
        <div class="skel-group">
          <div class="skel-label"></div>
          @for (i of [1,2,3,4,5]; track i) { <div class="skel-row"></div> }
        </div>
      }

      <!-- ── No results ───────────────────────────────────────── -->
      @if (groups().length > 0 && filteredTotal() === 0 && search()) {
        <div class="ml-empty">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          No members match "<strong>{{ search() }}</strong>"
        </div>
      }

      <!-- ── Groups ────────────────────────────────────────────── -->
      @for (group of groups(); track group.role) {
        @if (visibleMembers(group).length > 0) {
          <section class="ml-group">

            <!-- Group header (collapsible for Members) -->
            <button
              class="ml-group-head"
              [class.ml-group-head--collapsible]="group.role === 'member'"
              (click)="group.role === 'member' ? toggleCollapse(group.role) : null; $event.stopPropagation()"
            >
              @if (group.role === 'member') {
                <svg class="ml-collapse-icon" [class.ml-collapse-icon--open]="!isCollapsed(group.role)"
                     width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              }
              <span class="ml-group-label">{{ group.label }}</span>
              <span class="ml-group-count">{{ visibleMembers(group).length }}</span>
              <span class="ml-group-line"></span>
            </button>

            @if (!isCollapsed(group.role)) {
              <ul>
                @for (m of displayedMembers(group); track m.user.id) {
                  <li
                    class="ml-row"
                    [class.ml-row--has-menu]="openMenuFor() === m.user.id"
                    (click)="$event.stopPropagation()"
                  >
                    <!-- Presence dot -->
                    <span class="ml-dot" [class]="'ml-dot--' + presence(m.user.id)" aria-hidden="true"></span>

                    <!-- Avatar -->
                    <span class="ml-ava">
                      @if (m.user.avatar) {
                        <img [src]="m.user.avatar" [alt]="m.user.nickname ?? ''" />
                      } @else {
                        <span class="ml-ava-letter">{{ initials(m.user.nickname) }}</span>
                      }
                    </span>

                    <!-- Name + muted flag -->
                    <span class="ml-nick" [class.ml-nick--muted]="m.is_muted">{{ m.user.nickname ?? '—' }}</span>
                    @if (m.is_muted) {
                      <span class="ml-muted-icon" title="Muted" aria-label="Muted">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                      </span>
                    }

                    <!-- Friend action (everyone, on any other member) -->
                    @switch (friendRel(m.user.id)) {
                      @case ('none') {
                        <button class="ml-friend" title="Add friend" (click)="addFriend(m, $event)" aria-label="Add friend">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                        </button>
                      }
                      @case ('pending_incoming') {
                        <button class="ml-friend ml-friend--accept" title="Accept friend request" (click)="acceptFriend(m, $event)" aria-label="Accept friend request">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </button>
                      }
                      @case ('pending_outgoing') {
                        <span class="ml-friend ml-friend--pending" title="Request sent" aria-label="Request sent">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        </span>
                      }
                      @case ('friends') {
                        <button class="ml-friend ml-friend--friends" title="Message friend" (click)="messageFriend(m, $event)" aria-label="Message friend">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        </button>
                      }
                    }

                    <!-- Kebab menu trigger -->
                    @if (canModerate(m)) {
                      <button
                        class="ml-kebab"
                        (click)="toggleMenu(m.user.id, $event)"
                        title="Moderate {{ m.user.nickname }}"
                        [attr.aria-expanded]="openMenuFor() === m.user.id"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
                      </button>
                    }

                    <!-- Action menu -->
                    @if (openMenuFor() === m.user.id) {
                      <div class="ml-menu" (click)="$event.stopPropagation()">

                        <!-- Pending destructive confirmation -->
                        @if (pendingAction() !== null && pendingAction()!.member.user.id === m.user.id) {
                          <div class="ml-confirm">
                            @if (pendingAction()!.type === 'ban') {
                              <p class="ml-confirm-title">Ban {{ m.user.nickname }}?</p>
                              <input
                                class="ml-confirm-input"
                                type="text"
                                placeholder="Reason (required)"
                                [ngModel]="pendingAction()!.reason"
                                (ngModelChange)="updatePendingReason($event)"
                                (click)="$event.stopPropagation()"
                              />
                            } @else {
                              <p class="ml-confirm-title">Remove {{ m.user.nickname }}?</p>
                            }
                            <div class="ml-confirm-actions">
                              <button class="ml-confirm-cancel" (click)="pendingAction.set(null)">Cancel</button>
                              <button class="ml-confirm-ok danger" (click)="executePending()">
                                {{ pendingAction()!.type === 'ban' ? 'Ban' : 'Remove' }}
                              </button>
                            </div>
                          </div>
                        } @else {

                          <!-- Mute / Unmute -->
                          @if (!m.is_muted) {
                            <div class="ml-menu-group">
                              <span class="ml-menu-label">Mute for…</span>
                              @for (opt of muteOptions; track opt.minutes) {
                                <button (click)="mute(m, opt.minutes)">{{ opt.label }}</button>
                              }
                            </div>
                          } @else {
                            <button (click)="unmute(m)">Unmute</button>
                          }

                          <!-- Ban / Unban -->
                          @if (!m.is_banned) {
                            <button class="danger" (click)="startBan(m)">Ban…</button>
                          } @else {
                            <button (click)="unban(m)">Unban</button>
                          }

                          <!-- Kick -->
                          <button class="danger" (click)="startKick(m)">Remove from community</button>

                          <!-- Role change -->
                          @if (canChangeRoles()) {
                            <div class="ml-menu-group">
                              <span class="ml-menu-label">Set role</span>
                              @if (m.role !== 'admin')     { <button (click)="setRole(m, 'admin')">Make admin</button> }
                              @if (m.role !== 'moderator') { <button (click)="setRole(m, 'moderator')">Make moderator</button> }
                              @if (m.role !== 'member')    { <button (click)="setRole(m, 'member')">Make member</button> }
                            </div>
                          }
                        }
                      </div>
                    }
                  </li>
                }

                <!-- Show more / less for Members group -->
                @if (group.role === 'member' && visibleMembers(group).length > memberPageSize) {
                  <li class="ml-show-more">
                    @if (membersExpanded()) {
                      <button (click)="membersExpanded.set(false)">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="18 15 12 9 6 15"/></svg>
                        Show less
                      </button>
                    } @else {
                      <button (click)="membersExpanded.set(true)">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                        Show {{ visibleMembers(group).length - memberPageSize }} more
                      </button>
                    }
                  </li>
                }
              </ul>
            }

          </section>
        }
      }

    </div>
  `,
  styles: [`
    :host { display: flex; flex-direction: column; height: 100%; overflow: hidden; }

    @keyframes sonar      { 0%{box-shadow:0 0 0 0 rgba(34,197,94,.6)} 70%{box-shadow:0 0 0 8px rgba(34,197,94,0)} 100%{box-shadow:0 0 0 0 rgba(34,197,94,0)} }
    @keyframes shimmerWave{ 0%{background-position:-200% 0} 100%{background-position:200% 0} }

    /* ── Root scroll container ──────────────────────────────── */
    .ml-root {
      flex: 1; overflow-y: auto; font-size: 0.85rem;
      scrollbar-width: thin; scrollbar-color: rgba(124,58,237,.2) transparent;
      &::-webkit-scrollbar { width: 4px; }
      &::-webkit-scrollbar-thumb { background: rgba(124,58,237,.25); border-radius: 2px; }
    }

    /* ── Sticky header ──────────────────────────────────────── */
    .ml-header {
      position: sticky; top: 0; z-index: 10;
      padding: 0.65rem 0.75rem 0.5rem;
      background: rgba(17,15,30,.95); backdrop-filter: blur(8px);
      border-bottom: 1px solid rgba(124,58,237,.12);
      display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;
    }
    .ml-header__title {
      display: flex; align-items: center; gap: 0.4rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase;
      color: #7c3aed;
      svg { flex-shrink: 0; }
    }
    .ml-header__total {
      background: rgba(124,58,237,.15); color: #a78bfa;
      font-size: 0.6rem; padding: 1px 6px; border-radius: 100px;
      font-weight: 700;
    }
    .ml-header__pills { display: flex; align-items: center; gap: 6px; }
    .ml-online-pill {
      display: inline-flex; align-items: center; gap: 4px;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.58rem; letter-spacing: .8px; color: #4ade80; white-space: nowrap;
    }
    .ml-online-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 6px rgba(34,197,94,.8); animation: sonar 2.5s ease-out infinite; }
    .ml-filter-btn {
      width: 24px; height: 24px; border-radius: 6px; border: none; background: transparent;
      color: #5a5a72; cursor: pointer; display: grid; place-items: center; transition: all .14s;
      &.active { color: #4ade80; background: rgba(34,197,94,.12); }
      &:hover { color: #a78bfa; background: rgba(124,58,237,.15); }
    }

    /* ── Search ─────────────────────────────────────────────── */
    .ml-search {
      position: relative; display: flex; align-items: center;
      padding: 0.5rem 0.75rem; border-bottom: 1px solid rgba(124,58,237,.1);
    }
    .ml-search-icon { position: absolute; left: 1.25rem; color: #5a5a72; flex-shrink: 0; }
    .ml-search-input {
      width: 100%; background: rgba(124,58,237,.06); border: 1px solid rgba(124,58,237,.15);
      border-radius: 8px; padding: 0.45rem 0.75rem 0.45rem 1.85rem;
      color: #eaeaf2; font-size: 0.8rem; font-family: 'Archivo', system-ui, sans-serif;
      outline: none; transition: border-color .14s, background .14s;
      &::placeholder { color: #4c4c63; }
      &:focus { border-color: rgba(124,58,237,.4); background: rgba(124,58,237,.1); }
    }
    .ml-search-clear {
      position: absolute; right: 1.1rem; background: none; border: none; cursor: pointer;
      color: #5a5a72; display: grid; place-items: center; padding: 2px;
      &:hover { color: #eaeaf2; }
    }

    /* ── Empty state ─────────────────────────────────────────── */
    .ml-empty {
      padding: 1.5rem 0.75rem; text-align: center;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.75rem; color: #5a5a72; line-height: 1.6;
      display: flex; flex-direction: column; align-items: center; gap: 8px;
      svg { opacity: .4; }
    }

    /* ── Group section ───────────────────────────────────────── */
    .ml-group { padding: 0.6rem 0; }

    .ml-group-head {
      width: 100%; display: flex; align-items: center; gap: 0.4rem;
      padding: 0.2rem 0.75rem; background: none; border: none;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase; color: #7c3aed;
      &--collapsible { cursor: pointer; &:hover .ml-group-label { color: #a78bfa; } }
      &:not(.ml-group-head--collapsible) { cursor: default; }
    }
    .ml-collapse-icon { flex-shrink: 0; color: #5a5a72; transition: transform .2s; &--open { transform: rotate(0deg); } }
    .ml-group-label { flex-shrink: 0; }
    .ml-group-count {
      background: rgba(124,58,237,.12); color: #7c3aed;
      font-size: 0.58rem; padding: 1px 5px; border-radius: 100px;
      font-weight: 700; flex-shrink: 0;
    }
    .ml-group-line { flex: 1; height: 1px; background: rgba(124,58,237,.18); }

    /* ── Member row ──────────────────────────────────────────── */
    ul { list-style: none; padding: 0; margin: 0; }
    .ml-row {
      position: relative; display: flex; align-items: center; gap: 0.5rem;
      padding: 0.28rem 0.75rem; border-radius: 6px; transition: background .12s;
      &:hover { background: #1c1833; .ml-kebab { opacity: 1; } }
      &--has-menu { background: #1c1833; .ml-kebab { opacity: 1; } }
    }

    .ml-dot { width: 8px; height: 8px; border-radius: 50%; background: #3a3a55; flex-shrink: 0; }
    .ml-dot--online { background: #22c55e; animation: sonar 2.5s ease-out infinite; }
    .ml-dot--idle   { background: #d4af37; }
    .ml-dot--offline{ background: #3a3a55; }

    .ml-ava {
      width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
      display: grid; place-items: center; background: #1c1833; overflow: hidden;
      box-shadow: inset 0 0 0 1px rgba(124,58,237,.25);
      img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
    }
    .ml-ava-letter { font-family: 'Anton', 'Bebas Neue', sans-serif; font-size: 0.7rem; color: #a78bfa; line-height: 1; }

    .ml-nick { flex: 1; color: #c8cbe0; font-size: 0.83rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .ml-nick--muted { opacity: .5; text-decoration: line-through; }

    .ml-muted-icon { color: #f87171; opacity: .7; display: flex; align-items: center; flex-shrink: 0; }

    .ml-kebab {
      opacity: 0; background: none; border: none; color: #7a7a92; cursor: pointer;
      padding: 0.2rem 0.25rem; border-radius: 4px; display: grid; place-items: center;
      transition: color .12s, background .12s;
      &:hover { color: #a78bfa; background: rgba(124,58,237,.15); }
    }

    /* ── Friend action (on-brand green/gold) ─────────────────── */
    .ml-friend {
      background: none; border: none; cursor: pointer; color: #8a8aa0;
      padding: 0.2rem 0.3rem; border-radius: 5px; display: grid; place-items: center;
      transition: color .12s, background .12s, opacity .12s;
    }
    button.ml-friend { opacity: 0; }
    .ml-row:hover button.ml-friend, .ml-row--has-menu button.ml-friend { opacity: 1; }
    button.ml-friend:hover { color: var(--primary, #006c35); background: rgba(0,108,53,.16); }
    .ml-friend--accept  { color: #4ade80 !important; opacity: 1 !important; }
    .ml-friend--accept:hover { background: rgba(74,222,128,.14) !important; }
    .ml-friend--pending { color: var(--accent, #d4af37); opacity: .85; cursor: default; }
    .ml-friend--friends { color: #4ade80; opacity: .9; cursor: default; }

    /* ── Action menu ─────────────────────────────────────────── */
    .ml-menu {
      position: absolute; right: 0.5rem; top: 100%; z-index: 30;
      background: #110f1e; border: 1px solid rgba(124,58,237,.25); border-radius: 10px;
      padding: 0.4rem; min-width: 190px;
      box-shadow: 0 10px 32px rgba(0,0,0,.55), 0 0 20px rgba(124,58,237,.12);
      display: flex; flex-direction: column; gap: 0.12rem;

      button {
        text-align: left; background: none; border: none; color: #c8cbe0;
        padding: 0.42rem 0.6rem; border-radius: 6px; cursor: pointer; font-size: 0.8rem;
        transition: background .12s, color .12s;
        &:hover { background: #1c1833; color: #eaeaf2; }
        &.danger { color: #f87171; }
        &.danger:hover { background: rgba(248,113,113,.1); }
      }
    }
    .ml-menu-group {
      display: flex; flex-direction: column; gap: 0.08rem;
      padding: 0.25rem 0; border-top: 1px solid rgba(124,58,237,.18); margin-top: 0.2rem;
    }
    .ml-menu-label { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.1em; color: #5a5a72; padding: 0.18rem 0.6rem; }

    /* ── Inline confirmation ─────────────────────────────────── */
    .ml-confirm { padding: 0.4rem; display: flex; flex-direction: column; gap: 8px; }
    .ml-confirm-title { font-size: 0.8rem; color: #f87171; font-weight: 600; margin: 0 0.2rem; }
    .ml-confirm-input {
      width: 100%; padding: 7px 10px; background: rgba(248,113,113,.08);
      border: 1px solid rgba(248,113,113,.3); border-radius: 6px;
      color: #eaeaf2; font-size: 0.8rem; font-family: 'Archivo', system-ui, sans-serif;
      outline: none;
      &:focus { border-color: rgba(248,113,113,.5); }
      &::placeholder { color: #5a5a72; }
    }
    .ml-confirm-actions { display: flex; gap: 6px; }
    .ml-confirm-cancel {
      flex: 1; padding: 7px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
      border-radius: 6px; color: #9ca3af; cursor: pointer; font-size: 0.78rem; transition: all .12s;
      &:hover { background: rgba(255,255,255,.1); color: #eaeaf2; }
    }
    .ml-confirm-ok {
      flex: 1; padding: 7px; border: none; border-radius: 6px;
      color: #fff; cursor: pointer; font-size: 0.78rem; font-weight: 700; transition: all .12s;
      &.danger { background: rgba(248,113,113,.8); &:hover { background: #f87171; } }
    }

    /* ── Show more ───────────────────────────────────────────── */
    .ml-show-more {
      padding: 0.35rem 0.75rem;
      button {
        display: inline-flex; align-items: center; gap: 5px;
        background: none; border: none; cursor: pointer;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.68rem; letter-spacing: .8px; text-transform: uppercase;
        color: #5a5a72; transition: color .14s;
        &:hover { color: #a78bfa; }
      }
    }

    /* ── Skeleton ────────────────────────────────────────────── */
    .skel-group { padding: 0.85rem 0.75rem; }
    .skel-label {
      height: 10px; width: 60px; border-radius: 4px; margin-bottom: 0.65rem;
      background: linear-gradient(90deg, #1c1833 25%, #2a2045 50%, #1c1833 75%);
      background-size: 200% 100%; animation: shimmerWave 1.4s ease-in-out infinite;
    }
    .skel-row {
      height: 28px; border-radius: 6px; margin-bottom: 0.35rem;
      background: linear-gradient(90deg, #1c1833 25%, #231d40 50%, #1c1833 75%);
      background-size: 200% 100%; animation: shimmerWave 1.4s ease-in-out infinite;
    }
  `],
})
export class MemberListComponent {
  private readonly state = inject(CommunityStateService);
  private readonly auth  = inject(AuthService);
  readonly friends       = inject(FriendService);
  private readonly dm     = inject(DmService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  constructor() {
    // Ensure the friends graph is available so each row shows the right state.
    if (!this.friends.loaded()) this.friends.load();
  }

  /** Relationship between me and a member, for the row's friend button. */
  friendRel(userId: string): Relationship {
    return this.friends.relationshipWith(userId);
  }

  /** Send a friend request to a member. */
  addFriend(m: CommunityMember, ev: Event): void {
    ev.stopPropagation();
    const u: FriendUser = {
      id: m.user.id,
      name: m.user.nickname ?? '',
      nickname: m.user.nickname ?? null,
      display_name: m.user.nickname ?? 'Player',
      avatar_url: m.user.avatar ?? null,
    };
    this.friends.sendRequest(u).subscribe({
      next: (r) => this.toast.success(
        r.status === 'friends' ? `You and ${u.display_name} are now friends.` : `Friend request sent to ${u.display_name}.`),
      error: (e) => this.toast.error(e?.error?.message ?? 'Could not send request.'),
    });
  }

  /** Accept a member's incoming request straight from the roster. */
  acceptFriend(m: CommunityMember, ev: Event): void {
    ev.stopPropagation();
    const req = this.friends.requests().find(r => r.user.id === m.user.id);
    if (!req) return;
    this.friends.accept(req).subscribe({
      next: () => this.toast.success(`You and ${req.user.display_name} are now friends.`),
      error: (e) => this.toast.error(e?.error?.message ?? 'Failed.'),
    });
  }

  /** Open a private chat with a friend from the roster. */
  messageFriend(m: CommunityMember, ev: Event): void {
    ev.stopPropagation();
    const u: FriendUser = {
      id: m.user.id, name: m.user.nickname ?? '', nickname: m.user.nickname ?? null,
      display_name: m.user.nickname ?? 'Player', avatar_url: m.user.avatar ?? null,
    };
    this.dm.openWith(u).subscribe({
      next: () => this.router.navigate(['/community/home'], { queryParams: { pane: 'messages' } }),
      error: (e) => this.toast.error(e?.error?.message ?? 'Could not open chat.'),
    });
  }

  readonly muteOptions: MuteOption[] = [
    { label: '5 minutes',  minutes: 5 },
    { label: '30 minutes', minutes: 30 },
    { label: '1 hour',     minutes: 60 },
    { label: '4 hours',    minutes: 240 },
    { label: '1 day',      minutes: 1440 },
    { label: '1 week',     minutes: 10080 },
  ];

  // ── UI state ───────────────────────────────────────────────────────────────
  readonly openMenuFor    = signal<string | null>(null);
  readonly search         = signal('');
  readonly showOnlineOnly = signal(false);
  readonly membersExpanded= signal(false);
  readonly collapsedGroups= signal<Set<string>>(new Set());
  readonly pendingAction  = signal<PendingAction | null>(null);

  /** Max members shown before "Show more" button */
  readonly memberPageSize = 30;

  // ── Derived data ───────────────────────────────────────────────────────────

  readonly totalCount = computed(() => {
    const communityId = this.state.activeCommunityId();
    return communityId ? (this.state.membersByCommunity()[communityId] ?? []).length : 0;
  });

  readonly onlineCount = computed(() => {
    const communityId = this.state.activeCommunityId();
    if (!communityId) return 0;
    return (this.state.membersByCommunity()[communityId] ?? [])
      .filter(m => this.state.presenceByUser()[m.user.id] === 'online').length;
  });

  readonly groups = computed(() => {
    const communityId = this.state.activeCommunityId();
    if (!communityId) return [];

    const q       = this.search().toLowerCase().trim();
    const onlyOnline = this.showOnlineOnly();

    const members = (this.state.membersByCommunity()[communityId] ?? [])
      .filter(m => {
        if (q && !((m.user.nickname ?? '').toLowerCase().includes(q))) return false;
        if (onlyOnline && this.state.presenceByUser()[m.user.id] !== 'online') return false;
        return true;
      })
      // Sort: online → idle → offline within each group
      .sort((a, b) => {
        const presenceOrder = { online: 0, idle: 1, offline: 2 };
        const pa = presenceOrder[this.state.presenceByUser()[a.user.id] ?? 'offline'] ?? 2;
        const pb = presenceOrder[this.state.presenceByUser()[b.user.id] ?? 'offline'] ?? 2;
        return pa - pb;
      });

    const buckets: Record<MemberRole, CommunityMember[]> = { owner: [], admin: [], moderator: [], member: [] };
    for (const m of members) buckets[m.role].push(m);

    const labelMap: Record<MemberRole, string> = {
      owner: 'Owner', admin: 'Admins', moderator: 'Moderators', member: 'Members',
    };
    return (['owner', 'admin', 'moderator', 'member'] as MemberRole[])
      .filter(role => buckets[role].length > 0)
      .map(role => ({ role, label: labelMap[role], members: buckets[role] }));
  });

  readonly filteredTotal = computed(() =>
    this.groups().reduce((sum, g) => sum + g.members.length, 0)
  );

  /** Members filtered for display in a group (applies online-only + search already). */
  visibleMembers(group: { role: string; members: CommunityMember[] }): CommunityMember[] {
    return group.members;
  }

  /** Displayed members — truncated for the Members group unless expanded. */
  displayedMembers(group: { role: string; members: CommunityMember[] }): CommunityMember[] {
    if (group.role !== 'member' || this.membersExpanded() || this.search()) {
      return group.members;
    }
    return group.members.slice(0, this.memberPageSize);
  }

  isCollapsed(role: string): boolean {
    return this.collapsedGroups().has(role);
  }

  toggleCollapse(role: string): void {
    this.collapsedGroups.update(set => {
      const next = new Set(set);
      next.has(role) ? next.delete(role) : next.add(role);
      return next;
    });
  }

  // ── Permissions ────────────────────────────────────────────────────────────

  private readonly myMembership = computed<CommunityMember | null>(() => {
    const communityId = this.state.activeCommunityId();
    const myId = this.auth.currentUser()?.id;
    if (!communityId || !myId) return null;
    return (this.state.membersByCommunity()[communityId] ?? []).find(m => m.user.id === myId) ?? null;
  });

  private isPlatformAdmin(): boolean { return this.auth.currentUser()?.role === 'admin'; }

  canChangeRoles(): boolean {
    return this.isPlatformAdmin() || this.myMembership()?.role === 'owner';
  }

  canModerate(target: CommunityMember): boolean {
    const myId = this.auth.currentUser()?.id;
    if (!myId || target.user.id === myId) return false;
    if (target.role === 'owner') return false;
    if (this.isPlatformAdmin()) return true;
    const mine = this.myMembership();
    if (!mine) return false;
    if (mine.role === 'owner' || mine.role === 'admin') return true;
    if (mine.role === 'moderator') return target.role === 'member';
    return false;
  }

  // ── Menu actions ───────────────────────────────────────────────────────────

  toggleMenu(userId: string, ev: Event): void {
    ev.stopPropagation();
    this.pendingAction.set(null);
    this.openMenuFor.update(cur => (cur === userId ? null : userId));
  }

  closeMenu(): void {
    this.openMenuFor.set(null);
    this.pendingAction.set(null);
  }

  private close(): void { this.closeMenu(); }

  /** Start destructive action flow — shows inline confirmation instead of window.prompt/confirm */
  startBan(m: CommunityMember): void {
    this.pendingAction.set({ type: 'ban', member: m, reason: '' });
  }

  startKick(m: CommunityMember): void {
    this.pendingAction.set({ type: 'kick', member: m, reason: '' });
  }

  updatePendingReason(reason: string): void {
    const a = this.pendingAction();
    if (a) this.pendingAction.set({ ...a, reason });
  }

  executePending(): void {
    const a = this.pendingAction();
    if (!a) return;
    if (a.type === 'ban') {
      if (!a.reason.trim()) return; // reason required
      this.state.moderate({ action: 'ban', user_id: a.member.user.id, reason: a.reason.trim() });
    } else {
      this.state.moderate({ action: 'kick', user_id: a.member.user.id });
    }
    this.close();
  }

  mute(m: CommunityMember, minutes: number): void {
    this.state.moderate({ action: 'mute', user_id: m.user.id, minutes });
    this.close();
  }

  unmute(m: CommunityMember): void {
    this.state.moderate({ action: 'unmute', user_id: m.user.id });
    this.close();
  }

  unban(m: CommunityMember): void {
    this.state.moderate({ action: 'unban', user_id: m.user.id });
    this.close();
  }

  setRole(m: CommunityMember, role: 'admin' | 'moderator' | 'member'): void {
    this.state.moderate({ action: 'set_role', user_id: m.user.id, role });
    this.close();
  }

  presence(userId: string): PresenceStatus {
    return this.state.presenceByUser()[userId] ?? 'offline';
  }

  initials(nickname: string | null): string {
    return (nickname ?? '?').slice(0, 2).toUpperCase();
  }
}
