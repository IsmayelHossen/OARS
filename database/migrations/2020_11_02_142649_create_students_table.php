<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('it')->nullable();
            $table->string('session')->nullable();
            $table->string('image')->nullable();
            $table->string('bloodg')->nullable();
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('faname')->nullable();
            $table->string('maname')->nullable();
            $table->text('caddress')->nullable();
            $table->text('paddress')->nullable();
            $table->integer('status')->nullable();
            $table->string('password');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
}
