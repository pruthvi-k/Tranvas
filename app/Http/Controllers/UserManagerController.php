<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\User;

class UserManagerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Get the page where the user manage section will come
     *
     * @return \Illuminate\View\View
     */
    public function getUserManagePage()
    {
        return view('ng_master.manage-user');
    }

    /**
     * API call to get the list of users
     *
     * @return mixed
     */
    public function getUserList()
    {
        return User::all();
    }
}
