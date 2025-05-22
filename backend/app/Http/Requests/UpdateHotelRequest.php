<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHotelRequest extends FormRequest
{
    public function authorize() { return true; }
    public function rules(): array
    {
        return [
            'name'      => 'required|string|max:255',
            'nit'       => ['required','regex:/^\d{8}-\d$/','unique:hotels,nit,'.$this->hotel->id],
            'address'   => 'required|string|max:255',
            'city_id'   => 'required|exists:cities,id',
            'max_rooms' => 'required|integer|min:1',
        ];
    }
}
