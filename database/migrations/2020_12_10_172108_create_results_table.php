<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('results', function (Blueprint $table) {
            $table->id();
            $table->string('ccode');
            $table->string('ctitle');
            $table->string('chours');
            $table->string('lg');
            $table->float('gp');
            $table->float('attendancemark');
            $table->float('ctmark')->nullable();
            $table->integer('vivamark')->nullable();
            $table->integer('labexpmark')->nullable();
            $table->float('writtenmark');
            $table->string('labtheory');
            $table->string('it');
            $table->string('session');
            $table->string('semester');
            $table->string('finalexamyr');
            $table->string('heldIn');
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
        Schema::dropIfExists('results');
    }
}
