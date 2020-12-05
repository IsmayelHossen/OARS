<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ForgetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;
    public $email;
    public $tokenCode;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($email,$tokenCode)
    {
        $this->email=$email;
        $this->tokenCode=$tokenCode;

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.forgetMail')->subject('password reset link');
    }
}
