import 'package:flutter/material.dart';

class LandingPageMobile extends StatelessWidget {
  const LandingPageMobile({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mobile Landing Page'),
      ),
      body: const Center(
        child: Text('Welcome to the mobile landing page!'),
      ),
    );
  }
}
