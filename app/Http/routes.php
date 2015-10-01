<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('user/login', 'UserController@getUserLogin');
Route::post('user/do-login', 'UserController@postDoLogin');
Route::get('user/dashboard', 'UserController@getDashboard');
Route::get('user/logout', 'UserController@doLogout');