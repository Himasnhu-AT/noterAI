import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import 'package:noterai/models/user.dart';

class UserService {
  Future<User?> retrieveDetails() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? userJson = prefs.getString('user');
    if (userJson != null) {
      Map<String, dynamic> userMap = jsonDecode(userJson);
      return User.fromJson(userMap);
    } else {
      return null;
    }
  }
}
