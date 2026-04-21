package com.example.mp.data

import kotlinx.coroutines.flow.Flow

class HabitRepository(private val habitDao: HabitDao) {
    fun getAllHabits(): Flow<List<Habit>> = habitDao.getAllHabits()
    fun getAllCompletions(): Flow<List<Completion>> = habitDao.getAllCompletions()

    suspend fun addHabit(habit: Habit) = habitDao.insertHabit(habit)
    suspend fun deleteHabit(habitId: String) = habitDao.deleteHabit(habitId)

    suspend fun toggleCompletion(habitId: String, date: String, isCurrentlyCompleted: Boolean) {
        if (isCurrentlyCompleted) {
            habitDao.deleteCompletion(habitId, date)
        } else {
            habitDao.insertCompletion(Completion(habitId = habitId, date = date))
        }
    }
}