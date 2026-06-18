import "./chunk-7XEFWCRO.js";

// src/app/features/community/community.routes.ts
var COMMUNITY_ROUTES = [
  {
    path: "join/:token",
    loadComponent: () => import("./chunk-3QUEE6J4.js").then((m) => m.InviteRedeemComponent)
  },
  {
    path: "",
    loadComponent: () => import("./chunk-AUK5OJBK.js").then((m) => m.CommunityShellComponent),
    children: [
      {
        // Social home — Friends + Direct Messages merged into the shell.
        path: "home",
        loadComponent: () => import("./chunk-ZLLZ63C5.js").then((m) => m.SocialHomeComponent)
      },
      {
        path: ":slug",
        loadComponent: () => import("./chunk-7EK7KIYF.js").then((m) => m.ChannelViewComponent)
      },
      {
        path: ":slug/channel/:channelId",
        loadComponent: () => import("./chunk-7EK7KIYF.js").then((m) => m.ChannelViewComponent)
      }
    ]
  },
  {
    path: "admin",
    loadComponent: () => import("./chunk-QWNXLU2K.js").then((m) => m.CommunityAdminComponent)
  }
];
export {
  COMMUNITY_ROUTES
};
//# sourceMappingURL=chunk-3LOQ5RE6.js.map
