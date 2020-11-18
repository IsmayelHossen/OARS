<?php

namespace App\Interfaces;

use Illuminate\Http\Request;

interface StudentI
{
    /**
     * checkIfAuthenticated
     *
     * Check if an user is authenticated or not by request
     *
     * @param Request $request
     * @return bool -> true if authenticated, false if not
     */
    public function Individualgetdata();



}
