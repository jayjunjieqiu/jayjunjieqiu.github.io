---
title:          "Learning to Factorize and Adapt: A Versatile Approach Toward Universal Spatio-Temporal Foundation Models"
date:           2026-01-12 13:00:00 +0800
selected:       true
# pub:            "Neural Information Processing Systems (NeurIPS)"
# pub_date:       "2025"
pub_pre:        "Submitted to IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)."
pub_post:       ' Under review.'
# pub_last:       ' <span class="badge badge-pill badge-publication badge-success">Spotlight</span>'
abstract: >-
  Spatio-Temporal (ST) Foundation Models (STFMs) promise cross-dataset generalization, yet joint ST pretraining is computationally expensive and grapples with the heterogeneity of domain-specific spatial patterns. Substantially extending our preliminary conference version [1], we present FactoST-v2, an enhanced factorized framework redesigned for full weight transfer and arbitrary-length generalization. FactoST-v2 decouples universal temporal learning from domain-specific spatial adaptation. The first stage pretrains a minimalist encoder-only backbone using randomized sequence masking to capture invariant temporal dynamics, enabling probabilistic quantile prediction across variable horizons. The second stage employs a streamlined adapter to rapidly inject spatial awareness via meta adaptive learning and prompting. Comprehensive evaluations across diverse domains demonstrate that FactoST-v2 achieves state-of-the-art accuracy with linear efficiency—significantly outperforming existing foundation models in zero-shot and few-shot scenarios while rivaling domain-specific expert baselines. This factorized paradigm offers a practical, scalable path toward truly universal STFMs.

cover:          /assets/images/covers/2026-pub-factostv2.png
authors:
  - Siru Zhong
  - Junjie Qiu
  - Yangyu Wu
  - Yiqiu Liu
  - Yuanpeng He
  - Zhongwen Rao
  - Bin Yang
  - Chenjuan Guo
  - Hao Xu
  - Yuxuan Liang#
links:
  arXiv: https://arxiv.org/abs/2601.12083
  GitHub: https://github.com/CityMind-Lab/FactoST
---