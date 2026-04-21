package com.example.mp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.mp.ui.HabitViewModel
import com.example.mp.ui.HabitViewModelFactory
import com.example.mp.ui.screens.ManageHabitsScreen
import com.example.mp.ui.screens.TodayScreen
import com.example.mp.ui.theme.MPTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        val repository = (application as HabitApplication).repository

        setContent {
            MPTheme {
                val navController = rememberNavController()
                val viewModel: HabitViewModel = viewModel(
                    factory = HabitViewModelFactory(repository)
                )

                NavHost(navController = navController, startDestination = "today") {
                    composable("today") {
                        TodayScreen(
                            viewModel = viewModel,
                            onNavigateToManage = { navController.navigate("manage") }
                        )
                    }
                    composable("manage") {
                        ManageHabitsScreen(
                            viewModel = viewModel,
                            onNavigateBack = { navController.popBackStack() }
                        )
                    }
                }
            }
        }
    }
}