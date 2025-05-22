<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreHotelRoomRequest extends FormRequest
{
    public function authorize() { return true; }
    public function rules(): array
    {
        return [
            'room_type_id'     => 'required|exists:room_types,id',
            'accommodation_id' => 'required|exists:accommodations,id',
            'quantity'         => 'required|integer|min:1',
        ];
    }
}
