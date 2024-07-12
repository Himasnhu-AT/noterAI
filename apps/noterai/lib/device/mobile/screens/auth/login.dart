import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:noterai/device/mobile/screens/auth/signup.dart';
import 'package:noterai/device/mobile/screens/homepage.dart';
import 'package:noterai/functions/handle_shared_pref.dart';
import 'package:noterai/models/user.dart';

class LogInPage extends StatelessWidget {
  const LogInPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Log In'),
      ),
      body: const Padding(
        padding: EdgeInsets.all(16.0),
        child: LogInForm(),
      ),
    );
  }
}

class LogInForm extends StatefulWidget {
  const LogInForm({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _LogInFormState createState() => _LogInFormState();
}

class _LogInFormState extends State<LogInForm> {
  final _formKey = GlobalKey<FormState>();
  String _email = '';
  String _password = '';

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          TextFormField(
            decoration: const InputDecoration(
              labelText: 'Email',
              border: OutlineInputBorder(),
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter your email';
              }
              return null;
            },
            onSaved: (value) {
              _email = value!;
            },
          ),
          const SizedBox(height: 16.0),
          TextFormField(
            decoration: const InputDecoration(
              labelText: 'Password',
              border: OutlineInputBorder(),
            ),
            obscureText: true,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter a password';
              }
              return null;
            },
            onSaved: (value) {
              _password = value!;
            },
          ),
          const SizedBox(height: 16.0),
          TextButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const SignUpPage()),
              );
            },
            child: const Text('Don\'t have an account? Sign up'),
          ),
          const SizedBox(height: 16.0),
          ElevatedButton(
            onPressed: () {
              handleSubmit(context);
            },
            child: const Text('Sign Up'),
          ),
        ],
      ),
    );
  }

  Future<void> handleSubmit(BuildContext context) async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      if (kDebugMode) {
        print('Name: Name');
        print('Email: $_email');
        print('Password: $_password');
        print('Username: userName');
      }

      User user = User(
        id: "12",
        name: "Name",
        email: _email,
        password: _password,
        username: "userName",
        token: "fjdals;f",
      );

      SharedPreferencesService prefsService =
          await SharedPreferencesService.getInstance();
      bool isStored = await prefsService.storeUser(user);
      if (isStored) {
        Navigator.push(
          // ignore: use_build_context_synchronously
          context,
          MaterialPageRoute(builder: (context) => HomePage()),
        );
      } else {
        if (kDebugMode) {
          print('Failed to store user');
        }
      }
    }
  }
}
