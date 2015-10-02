<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', [
            'except' => [
                'getUserLogin',
                'postDoLogin'
            ]
        ]);
    }

    /**
     * Login page
     *
     * @return \Illuminate\View\View
     */
    public function getUserLogin()
    {
        // if user is logged in already, he should not see the login screen
        if (Auth::user()) {
            return redirect('user/dashboard');
        }

        return view('user.login');
    }

    /**
     * Checking the credentials and logging the user
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function postDoLogin(Request $request)
    {
        // setting us the required information
        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password'),
            'status' => 1,
        ];

        if (!Auth::attempt($credentials)) {
            // if the user credentials are not correct we
            // will redirect user to the login page with
            // message that the credentials were wrong
            Session::flash('flash_error', 'Something went wrong with the username and / or password');
            return redirect('user/login');
        }

        Session::flash('flash_message', 'Login successful');
        return redirect('user/dashboard');
    }

    /**
     * Give user his dashboard
     *
     * @return \Illuminate\View\View
     */
    public function getDashboard()
    {
        return view('user.dashboard');
    }

    /**
     * Log out the user and destroy his session
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function doLogout()
    {
        Auth::logout();
        Session::flash('flash_message', 'You have logged out.');
        return redirect('user/login');
    }
}
