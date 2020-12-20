<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class LoginReg extends Mailable
{
    use Queueable, SerializesModels;
    public $email;
    public $vcode;
    /**
     * Create a new message instance.
     *
     * @return void
     */

    public function __construct($email,$vcode)
    {
        $this->email=$email;
        $this->vcode=$vcode;

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.LoginReg')->subject('Verification Code');
    }
}
