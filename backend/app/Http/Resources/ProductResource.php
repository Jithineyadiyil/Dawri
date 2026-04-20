<?php
declare(strict_types=1);
namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource {
    public function toArray($request): array {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'name_ar'     => $this->name_ar,
            'brand'       => $this->brand,
            'category'    => $this->category,
            'face_value'  => $this->face_value,
            'our_price'   => $this->our_price,
            'currency'    => $this->currency,
            'region'      => $this->region,
            'image_url'   => $this->image_url,
            'distributor' => $this->distributor,
        ];
    }
}
