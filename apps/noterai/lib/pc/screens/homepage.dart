import 'package:flutter/material.dart';
import 'package:noterai/services/user_service.dart';
import 'package:noterai/models/user.dart';

class HomePage extends StatelessWidget {
  // ignore: prefer_const_constructors_in_immutables
  HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home Page'),
      ),
      body: FutureBuilder<User?>(
        future: UserService().retrieveDetails(),
        builder: (BuildContext context, AsyncSnapshot<User?> snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          } else if (snapshot.hasError) {
            return Center(
              child: Text('Error retrieving user details: ${snapshot.error}'),
            );
          } else if (!snapshot.hasData || snapshot.data == null) {
            return const Center(
              child: Text('No user details available.'),
            );
          } else {
            User user = snapshot.data!;
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text("Welcome to the home page"),
                  const SizedBox(height: 20),
                  const Text("User Details:"),
                  Text("Name: ${user.name}"),
                  Text("Email: ${user.email}"),
                  Text("Username: ${user.username}"),
                ],
              ),
            );
          }
        },
      ),
    );
  }
}
