//
//  HomePage.swift
//  noterAI
//
//  Created by Himanshu on 7/31/24.
//

import SwiftUI

struct HomePage: View {
    
    var body: some View {
        VStack {
            Text("Welcome Back **\(viewModel().username.lowercased())**!")
            Text("Today is: **\(Date().formatted(.dateTime))**")
            Button("Log out", action: {
                viewModel().logout()
                print("Logout pressed")
            })
                .tint(.red)
                .buttonStyle(.bordered)
        }
    }
}

#Preview {
    HomePage()
}
