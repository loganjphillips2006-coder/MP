package com.example.mp

import android.app.Application
import com.example.mp.data.HabitDatabase
import com.example.mp.data.HabitRepository

class HabitApplication : Application() {
    val database by lazy { HabitDatabase.getDatabase(this) }
    val repository by lazy { HabitRepository(database.habitDao()) }
}