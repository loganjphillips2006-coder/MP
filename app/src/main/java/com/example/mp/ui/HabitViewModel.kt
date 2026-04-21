package com.example.mp.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.mp.data.Habit
import com.example.mp.data.HabitRepository
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import java.time.LocalDate
import java.util.TreeSet
import java.util.UUID

data class HabitWithStatus(
    val habit: Habit,
    val isCompletedToday: Boolean,
    val streak: Int
)

data class HabitUiState(
    val habits: List<HabitWithStatus> = emptyList()
)

class HabitViewModel(private val repository: HabitRepository) : ViewModel() {

    private val _uiState = MutableStateFlow(HabitUiState())
    val uiState: StateFlow<HabitUiState> = _uiState.asStateFlow()

    init {
        viewModelScope.launch {
            combine(
                repository.getAllHabits(),
                repository.getAllCompletions()
            ) { habits, allCompletions ->
                val today = LocalDate.now().toString()
                val completionsByHabit = allCompletions.groupBy { it.habitId }
                habits.map { habit ->
                    val dates = completionsByHabit[habit.id]
                        ?.mapTo(TreeSet()) { it.date } ?: TreeSet()
                    HabitWithStatus(
                        habit = habit,
                        isCompletedToday = dates.contains(today),
                        streak = calculateStreak(dates)
                    )
                }
            }.collect { habitsWithStatus ->
                _uiState.update { it.copy(habits = habitsWithStatus) }
            }
        }
    }

    private fun calculateStreak(dates: TreeSet<String>): Int {
        if (dates.isEmpty()) return 0
        val localDates = dates.mapTo(TreeSet()) { LocalDate.parse(it) }
        val today = LocalDate.now()
        var checkDate = if (localDates.contains(today)) today else today.minusDays(1)
        if (!localDates.contains(checkDate)) return 0
        var streak = 0
        while (localDates.contains(checkDate)) {
            streak++
            checkDate = checkDate.minusDays(1)
        }
        return streak
    }

    fun addHabit(name: String) {
        if (name.isBlank()) return
        viewModelScope.launch {
            repository.addHabit(
                Habit(
                    id = UUID.randomUUID().toString(),
                    name = name.trim(),
                    createdAt = LocalDate.now().toString()
                )
            )
        }
    }

    fun deleteHabit(habitId: String) {
        viewModelScope.launch { repository.deleteHabit(habitId) }
    }

    fun toggleCompletion(habitId: String) {
        val today = LocalDate.now().toString()
        val isCompleted = _uiState.value.habits
            .find { it.habit.id == habitId }?.isCompletedToday ?: return
        viewModelScope.launch {
            repository.toggleCompletion(habitId, today, isCompleted)
        }
    }
}

class HabitViewModelFactory(private val repository: HabitRepository) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        @Suppress("UNCHECKED_CAST")
        return HabitViewModel(repository) as T
    }
}