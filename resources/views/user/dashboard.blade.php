@extends('master')

@section('content')
    <div class="row">
        <div class="col-sm-12">
            <h1>Welcome to your dashboard {{Auth::user()->name}}</h1>
        </div>
    </div>
@endsection