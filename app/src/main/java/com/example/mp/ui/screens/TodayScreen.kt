package com.example.mp.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import com.example.mp.ui.HabitViewModel
import com.example.mp.ui.HabitWithStatus
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TodayScreen(viewModel: HabitViewModel, onNavigateToManage: () -> Unit) {
    val uiState by viewModel.uiState.collectAsState()
    val formattedDate = LocalDate.now()
        .format(DateTimeFormatter.ofPattern("EEEE, MMMM d", Locale.getDefault()))

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Today") },
                actions = {
                    TextButton(onClick = onNavigateToManage) {
                        Text("Manage")
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(horizontal = 16.dp)
        ) {
            Text(
                text = formattedDate,
                style = MaterialTheme.typography.titleMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(vertical = 12.dp)
            )

            if (uiState.habits.isEmpty()) {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "No habits yet.\nTap Manage to add some.",
                        style = MaterialTheme.typography.bodyLarge,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        textAlign = TextAlign.Center
                    )
                }
            } else {
                LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    items(uiState.habits, key = { it.habit.id }) { habitWithStatus ->
                        HabitItem(
                            habitWithStatus = habitWithStatus,
                            onToggle = { viewModel.toggleCompletion(habitWithStatus.habit.id) }
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun HabitItem(habitWithStatus: HabitWithStatus, onToggle: () -> Unit) {
    val isCompleted = habitWithStatus.isCompletedToday
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = if (isCompleted)
                MaterialTheme.colorScheme.surfaceVariant
            else
                MaterialTheme.colorScheme.surface
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Checkbox(checked = isCompleted, onCheckedChange = { onToggle() })
            Spacer(modifier = Modifier.width(12.dp))
            Text(
                text = habitWithStatus.habit.name,
                style = MaterialTheme.typography.bodyLarge,
                textDecoration = if (isCompleted) TextDecoration.LineThrough else TextDecoration.None,
                color = if (isCompleted)
                    MaterialTheme.colorScheme.onSurfaceVariant
                else
                    MaterialTheme.colorScheme.onSurface,
                modifier = Modifier.weight(1f)
            )
            if (habitWithStatus.streak > 0) {
                Text(
                    text = "🔥 ${habitWithStatus.streak}",
                    style = MaterialTheme.typography.bodyMedium
                )
            }
        }
    }
}