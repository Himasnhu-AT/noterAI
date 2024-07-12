import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:noterai/models/user.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SharedPreferencesService {
  static SharedPreferencesService? _instance;
  SharedPreferences? _prefs;

  static Future<SharedPreferencesService> getInstance() async {
    if (_instance == null) {
      _instance = SharedPreferencesService();
      await _instance!._init();
    }
    return _instance!;
  }

  Future<void> _init() async {
    _prefs = await SharedPreferences.getInstance();
  }

  Future<bool> clearData() async {
    assert(_prefs != null, 'SharedPreferences not initialized');
    bool isRemoved = await _prefs!.clear();
    if (kDebugMode) {
      if (isRemoved) {
        print("SharedPreferences cleared...");
      } else {
        print("Failed to clear SharedPreferences");
      }
    }
    return isRemoved;
  }

  Future<bool> storeUser(User user) async {
    assert(_prefs != null, 'SharedPreferences not initialized');
    String userJson = jsonEncode(user.toJson());
    bool isStored = await _prefs!.setString('user', userJson);
    if (kDebugMode) {
      print('User stored successfully!');
    }
    return isStored;
  }

  Future<User?> getUser() async {
    assert(_prefs != null, 'SharedPreferences not initialized');
    String? userJson = _prefs!.getString('user');
    if (userJson != null) {
      Map<String, dynamic> userMap = jsonDecode(userJson);
      return User.fromJson(userMap);
    } else {
      return null;
    }
  }

  Future<String?> retrieveToken() async {
    User? user = await getUser();
    if (user != null) {
      if (kDebugMode) {
        print('Token retrieved successfully!');
        print(user.token);
      }
      return user.token;
    } else {
      if (kDebugMode) {
        print('No user found!');
      }
      return null;
    }
  }
}
