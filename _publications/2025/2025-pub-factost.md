---
title:          "Learning to Factorize Spatio-Temporal Foundation Models"
date:           2025-09-19 01:54:00 +0800
selected:       true
pub:            "Neural Information Processing Systems (NeurIPS)"
pub_date:       "2025"
# pub_pre:        "Submitted to "
# pub_post:       'Under review.'
pub_last:       ' <span class="badge badge-pill badge-publication badge-success">Spotlight</span>'
abstract: >-
  Spatio-Temporal (ST) Foundation Models (STFMs) promise cross-dataset generalization, yet joint ST pretraining is computationally costly and struggles with domain-specific spatial correlations. To address this, we propose FactoST, a factorized STFM that decouples universal temporal pretraining from ST adaptation. The first stage trains a space-agnostic backbone via multi-task learning to capture multi-frequency, cross-domain temporal patterns at low cost. The second stage attaches a lightweight adapter that rapidly adapts the backbone to specific ST domains via metadata fusion, interaction pruning, domain alignment, and memory replay. Extensive forecasting experiments show that in few-shot settings, FactoST reduces MAE by up to 46.4% versus UniST, uses 46.2% fewer parameters, achieves 68% faster inference than OpenCity, and remains competitive with expert models. This factorized view offers a practical, scalable path toward truly universal STFMs.

cover:          /assets/images/covers/2025-pub-factost.png
authors:
  - Siru Zhong
  - Junjie Qiu
  - Yangyu Wu
  - Xingchen Zou
  - Bin Yang
  - Chenjuan Guo
  - Hao Xu
  - Yuxuan Liang#
links:
  Poster: https://neurips.cc/virtual/2025/poster/117035
---