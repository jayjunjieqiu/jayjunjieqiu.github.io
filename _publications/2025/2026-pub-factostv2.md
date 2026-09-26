---
title:          "Learning to Factorize and Adapt: A Versatile Approach Toward Universal Spatio-Temporal Foundation Models"
date:           2026-01-12 13:00:00 +0800
selected:       false
short_name:     FactoST-v2
venue_label:    Preprint · 2026
paper_url:      https://arxiv.org/abs/2601.12083
cover_height:   472
visual_caption: One temporal backbone. Flexible context.
summary: >-
  A unified temporal backbone for variable-length context and probabilistic
  forecasting, with full pretrained weight reuse during downstream adaptation.
contribution: >-
  I designed Universal Temporal Pretraining (UTP) and ran its pretraining,
  cross-domain evaluation, and ablation studies.
method_details: >-
  The encoder-only quantile model uses normalized sequence patches and randomly
  masked history prefixes, with gated attention and partial rotary positional encoding.
  It was configured for up to 2,048 input steps and 256 forecast steps;
  fixed-weight zero-shot evaluations used 12→12 and 96→96 context/forecast settings
  on benchmarks excluded from pretraining.
result: >-
  On PEMS08 at 96→96, the model with history masking achieved an MAE of 91.09
  versus 107.22 without masking, a 15% relative reduction. See Tables IX–X in the paper.
# pub:            "Neural Information Processing Systems (NeurIPS)"
# pub_date:       "2025"
pub_pre:        "Preprint, 2026"
# pub_last:       ' <span class="badge badge-pill badge-publication badge-success">Spotlight</span>'
abstract: >-
  We extend FactoST to transfer more easily across domains and make predictions over flexible time horizons, even when little or no target-domain data is available.

cover:          /assets/images/covers/2026-pub-factostv2.webp
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
