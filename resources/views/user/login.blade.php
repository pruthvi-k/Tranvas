@extends('master')

@section('content')
    <div class="row">
        <div class="col-sm-4 col-sm-push-4 jumbotron">
            <h1>Login</h1>

            <form action="{{url('user/do-login')}}" method="post">
                {{csrf_field()}}
                <div class="form-group">
                    <input type="email" class="form-control"
                           placeholder="Enter your email address" name="email">
                </div>

                <div class="form-group">
                    <input type="password" class="form-control"
                           placeholder="Enter your password" name="password">
                </div>

                <div class="form-group">
                    <input type="submit" name="login" value="Login" class="btn btn-success">
                </div>
            </form>
        </div>
    </div>
@endsection