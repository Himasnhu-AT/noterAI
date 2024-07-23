import 'package:flutter/material.dart';
import 'package:noterai/device/pc/screens/auth/signup.dart';
import 'package:noterai/functions/handle_shared_pref.dart';
import 'package:noterai/device/pc/screens/homepage.dart';

class LandingPagePC extends StatelessWidget {
  const LandingPagePC({super.key});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<String?>(
      future: _retrieveToken(),
      builder: (BuildContext context, AsyncSnapshot<String?> snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Scaffold(
            body: Center(
              child: CircularProgressIndicator(),
            ),
          );
        } else if (snapshot.hasError) {
          return Scaffold(
            body: Center(
              child: Text('Error retrieving token: ${snapshot.error}'),
            ),
          );
        } else {
          // Check if the token is available
          if (snapshot.data != null && snapshot.data!.isNotEmpty) {
            // Token is available, navigate to the homepage
            return HomePage();
          } else {
            // Token is not available, navigate to the signup page
            return const SignUpPage();
          }
        }
      },
    );
  }

  Future<String?> _retrieveToken() async {
    SharedPreferencesService prefsService =
        await SharedPreferencesService.getInstance();
    return prefsService.retrieveToken();
  }
}
