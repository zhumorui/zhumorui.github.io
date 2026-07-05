---
title: "Mind the Hitch: Dynamic Calibration and Articulated Perception for Autonomous Trucks"
author: "Morui Zhu, Yongqi Zhu, Song Fu, Qing Yang"
date: "2026-03-24"
journal: "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2026"
external_url: "https://arxiv.org/abs/2603.23711"
description: "dCAP: a vision-based framework that continuously estimates the 6-DoF relative pose between tractor and trailer cameras, plus the STT4AT benchmark for articulated trucks."
tags:
  - "Autonomous Driving"
  - "Perception"
  - "Calibration"
---

Autonomous trucking poses unique perception challenges due to articulated tractor-trailer geometry and time-varying sensor poses caused by the fifth-wheel joint and trailer flex. We propose **dCAP** (dynamic Calibration and Articulated Perception), a vision-based framework that continuously estimates the 6-DoF relative pose between tractor and trailer cameras using a transformer with cross-view and temporal attention. Integrated with BEVFormer, dCAP improves 3D object detection by replacing static calibration with dynamically predicted extrinsics. We also introduce **STT4AT**, a CARLA-based benchmark simulating semi-trailer trucks with synchronized multi-sensor suites and time-varying inter-rig geometry across diverse environments.

- **arXiv:** [2603.23711](https://arxiv.org/abs/2603.23711)
- **Code:** [github.com/zhumorui/dCAP](https://github.com/zhumorui/dCAP)
