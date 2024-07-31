//
//  AuthView.swift
//  noterAI
//
//  Created by Himanshu on 7/31/24.
//

import SwiftUI

struct AuthView: View {
    
    @State var showLoginPage: Bool = true
    
    var body: some View {
        ZStack {
            if showLoginPage {
                LoginPage(showLoginPage: $showLoginPage)
            } else {
                SignUpPage(showLoginPage: $showLoginPage)
            }
        }
        .animation(.easeInOut, value: showLoginPage)
        .edgesIgnoringSafeArea(.bottom)
    }
    
}

#Preview {
    AuthView()
}
