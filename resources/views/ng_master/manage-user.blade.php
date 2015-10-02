@extends('master')

@section('content')
    <div class="content-container" ng-app="myApp">
        <h1>User management</h1>

        <div ng-view></div>
    </div>
@endsection

@section('scripts')
    <script src="{{url(elixir('js/userModule.js'))}}"></script>
@endsection