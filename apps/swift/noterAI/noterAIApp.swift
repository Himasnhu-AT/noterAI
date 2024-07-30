//
//  noterAIApp.swift
//  noterAI
//
//  Created by Himanshu on 7/23/24.
//

import SwiftUI

@main
struct noterAIApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
            //LoginPage()
        }
        // .windowStyle(HiddenTitleBarWindowStyle())
        
        MenuBarExtra {
            MenuBar()
        } label: {
            Image("logo")
        }
    }
}
