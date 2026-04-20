<?php
declare(strict_types=1);
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class SubmitMatchResultRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return [
            'winner_participant_id' => ['required','string','uuid'],
            'score_a'              => ['nullable','integer','min:0'],
            'score_b'              => ['nullable','integer','min:0'],
            'screenshot'           => ['required','file','mimes:jpg,jpeg,png','max:5120'],
        ];
    }
}
