<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttendacesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attendaces', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('session')->nullable();
            $table->string('email')->nullable();
            $table->string('course_code')->nullable();
            $table->string('teacheremail')->nullable();
            $table->string('attend')->nullable();
            $table->string('semester')->nullable();
            $table->text('TakenDate')->nullable();
            $table->string('it')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('attendaces');
    }
}
