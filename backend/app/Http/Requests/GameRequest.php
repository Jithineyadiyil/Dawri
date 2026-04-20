<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class GameRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check() && Auth::user()->role === 'admin';
    }

    public function rules(): array
    {
        $gameId = $this->route('game')?->id;

        return [
            'key'                 => ['required','string','max:60','alpha_dash', Rule::unique('games','key')->ignore($gameId)],
            'name'                => ['required','string','max:120'],
            'name_ar'             => ['nullable','string','max:120'],
            'icon_url'            => ['nullable','url','max:500'],
            'icon_emoji'          => ['nullable','string','max:10'],
            'platform'            => ['nullable','string','max:60'],
            'genre'               => ['nullable','string','max:60'],
            'supported_formats'   => ['nullable','array'],
            'supported_formats.*' => ['string','in:single_elimination,double_elimination,round_robin,swiss'],
            'is_active'           => ['boolean'],
            'sort_order'          => ['integer','min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'key.unique'    => 'A game with this key already exists.',
            'key.alpha_dash' => 'Key may only contain letters, numbers, hyphens and underscores.',
        ];
    }
}
