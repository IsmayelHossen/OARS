<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCTMarksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('c_t_marks', function (Blueprint $table) {
            $table->id();
            $table->string('It');
            $table->string('session');
            $table->string('ccode');
            $table->string('cname');
            $table->string('temail');
            $table->string('ctname');
            $table->float('marks');
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
        Schema::dropIfExists('c_t_marks');
    }
}
