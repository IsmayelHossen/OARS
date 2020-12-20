<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title></title>

    <!-- Scripts -->
    <script src="{{ asset('public/js/app.js') }}" defer></script>
    <script src="{{ asset('public/ExtraJs/jquery/jquery.min.js')}}"></script>
    <script src="{{ asset('public/ExtraJs/js/main.js')}}"></script>
    <script src="{{ asset('public/ExtraJs/scrollreveal/scrollreveal.min.js')}}"></script>
    <script src="{{ asset('public/ExtraJs/counterup/counterup.min.js')}}"></script>
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles extra -->
    <link href="{{ asset('public/css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('public/ExtraJs/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet">
    <link href="{{ asset('public/ExtraJs/animate/animate.min.css')}}" rel="stylesheet">
    <link href="{{ asset('public/ExtraJs/ionicons/css/ionicons.min.css')}}" rel="stylesheet">
    <link href="{{ asset('public/ExtraJs/style.css')}}" rel="stylesheet">
       <!-- Styles extra-->
     <link href="{{ asset('public/css/style.css') }}" rel="stylesheet">
<style>
.translated-ltr{margin-top:-40px;}
.translated-ltr{margin-top:-40px;}
.goog-te-banner-frame {display: none;margin-top:-20px;}

.goog-logo-link {
   display:none !important;
}

.goog-te-gadget{
   color: transparent !important;
}

.goog-te-gadget{
   color: transparent !important;
}


</style>
<script src="{{ asset('public/js/translate.js') }}" defer></script>
<script type="text/javascript">
    function googleTranslateElementInit() {
      new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
    }
    </script>
</head>
<body>

<div class="container12" >
    <div class="row justify-content-center">
        <div class="col-md-12" >
           <div id="example">

           </div>
        </div>
    </div>


</div>

</body>
</html>
