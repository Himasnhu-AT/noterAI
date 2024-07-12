import 'dart:io' show Platform;
import 'package:flutter/material.dart';
import 'package:noterai/mobile/landing.dart';
import 'package:noterai/pc/landing.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    Widget landingPage;

    if (Platform.isAndroid || Platform.isIOS) {
      // Open mobile landing page
      landingPage = const LandingPageMobile();
    } else {
      // Open desktop landing page (PC, Mac, Linux)
      landingPage = const LandingPagePC();
    }

    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: landingPage,
    );
  }
}
