<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Tranvas</title>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="{{url('css/app.css')}}">


    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script>
        var baseUrl = "{{url('/')}}/";
    </script>
</head>
<body>
@if(Auth::user())
    @include('nav')
@endif
<div class="container">
    @if(Session::has('flash_message'))
        <div class="alert alert-success">{{Session::get('flash_message')}}</div>
    @endif
    @if(Session::has('flash_error'))
        <div class="alert alert-danger">{{Session::get('flash_error')}}</div>
    @endif
    @if(Session::has('flash_warning'))
        <div class="alert alert-warning">{{Session::get('flash_warning')}}</div>
    @endif

    @yield('content')
</div>

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<script src="{{url('js/vendor/angular.min.js')}}"></script>
<script src="{{url('js/vendor/angular-route.min.js')}}"></script>
<script src="{{url('js/vendor/angular-cookies.min.js')}}"></script>
<script src="{{url(elixir('js/all.js'))}}"></script>
@yield('scripts')
</body>
</html>