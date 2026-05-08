<?php

use Illuminate\Support\Facades\Route;

Route::get('/saludo', function () {
    return response()->json([
        'mensaje' => 'Hola desde Backend de Laravel 😒 con React'
    ]);
});

?>