//
//  ContentView.swift
//  noterAI
//
//  Created by Himanshu on 7/23/24.
//

import SwiftUI

struct ContentView: View {
    
    @StateObject var vm = viewModel()
    
    var body: some View {
        if vm.authenticated {
            HomePage()
        } else {
            // ZStack {
            AuthView()
        }
    }
}

#Preview {
    ContentView()
}
