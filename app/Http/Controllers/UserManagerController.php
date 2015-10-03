<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

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

    /**
     * Saving the user after validating the response
     *
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function postSaveUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:5'
        ]);

        if ($validator->fails()) {
            return response($validator->errors(), 403);
        }

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'status' => 1
        ]);

        return response($user, 201);
    }

    /**
     * Deleting the user based on the id provided
     *
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function postDeleteUser(Request $request)
    {
        $id = $request->input('id');

        if (DB::table('users')->where('id', $id)->delete()) {
            return response('User deleted', 201);
        }
    }
}
