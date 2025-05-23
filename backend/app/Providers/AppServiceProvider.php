<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Contracts\HotelRepositoryInterface;
use App\Repositories\HotelRepository;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        // Aquí vinculamos la interfaz con la implementación
        $this->app->bind(
            HotelRepositoryInterface::class,
            HotelRepository::class
        );
    }

    public function boot()
    {
        //
    }
}
