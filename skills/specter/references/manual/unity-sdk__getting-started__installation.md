# Installation

Welcome to the first steps in integrating the SpecterSDK into your Unity game! This section will guide you through the setup and installation process, configuring your project, and making your first API call. By the end of this section, you'll be ready to explore the full range of features offered by the SpecterSDK.

Getting the SpecterSDK up and running in your Unity project is a straightforward process. This updated guide will take you through the corrected steps for setting up and initializing the SDK, ensuring you're ready to utilize its full capabilities in no time.

## **Dependencies**

Before installing the SpecterSDK, it's important to address a key dependency required for its operation.

#### **Newtonsoft JSON for Unity**

The SpecterSDK relies on the Newtonsoft JSON package for JSON serialization and deserialization. Usually Newtonsoft is already present in every newly created Unity project unless you use a custom project template. Check the Packages folder in Unity to check if Newtonsoft is already installed.

In case it is not in your project Packages, follow these steps to install it:

1. **Unity Package Manager (UPM)**: The recommended way to add Newtonsoft JSON to your project is through Unity's Package Manager using a UPM package.
   * Navigate to `Window` > `Package Manager` in Unity.
   * Click the `+` icon and select `Add package by name...`.
   * Enter the `com.unity.nuget.newtonsoft-json` for the Newtonsoft JSON UPM package.
   * Unity will download and install the package automatically.

Ensure this dependency is installed correctly before proceeding with the SpecterSDK installation.

## **Install the SDK**

{% hint style="info" %}
**Note**: The Specter Unity SDK is currently in pre-release and not published on the Unity Asset store. Please use the latest v2.0.0 beta release from the GitHub repo to explore and familiarize yourself with the SDK.
{% endhint %}

1. **Install Options**: There are multiple options for importing the SDK into your Unity project.
   * **Unity Asset Store Install (Recommended)**: Obtain the latest version of the SpecterSDK for Unity from the official repository or the Unity Asset Store.
   * **Manual Install**: Download the latest release from the [Official SpecterSDK](https://github.com/dirtcubeinteractive/SpecterSDK/releases) repo on GitHub. Unarchive the file and drag the SDK folder into your Unity project.
2. **Verify the SDK Installation**: Check that the SpecterSDK folder is now present in your project's `Assets` directory, indicating a successful import.

## Conclusion

You've successfully integrated the SpecterSDK into your Unity project, setting the stage for adding sophisticated game features with ease. As you proceed, remember that the SpecterSDK community and support resources are available to assist with any questions or challenges you may encounter.
