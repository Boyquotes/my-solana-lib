/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/cybergold.json`.
 */
export type Cybergold = {
  "address": "6V4AfucuYfgRPgw4SEwJxcTN49ubXAwT2uEb1zz2PfSZ",
  "metadata": {
    "name": "cybergold",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "CyberGold protocol: A decentralized gold-pegged sythetic asset."
  },
  "instructions": [
    {
      "name": "burn",
      "discriminator": [
        116,
        110,
        29,
        56,
        107,
        219,
        42,
        93
      ],
      "accounts": [
        {
          "name": "refPriceUpdate"
        },
        {
          "name": "collatPriceUpdate"
        },
        {
          "name": "poolParams",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  95,
                  112,
                  97,
                  114,
                  97,
                  109,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "synthMint"
              },
              {
                "kind": "account",
                "path": "collatMint"
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "signerCollatAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "account",
                "path": "collatTokenProgram"
              },
              {
                "kind": "account",
                "path": "collatMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "collatMint"
        },
        {
          "name": "signerSynthTokenAccount",
          "writable": true
        },
        {
          "name": "synthMint",
          "writable": true
        },
        {
          "name": "admin",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "collatTokenProgram"
        },
        {
          "name": "synthTokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "rewardExtractorCtx",
          "accounts": [
            {
              "name": "poolState",
              "docs": [
                "PoolState PDA (stores prev_lst_supply, prev_stake_pool_lamports, etc.)"
              ],
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      112,
                      111,
                      111,
                      108,
                      95,
                      115,
                      116,
                      97,
                      116,
                      101
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "synthMint"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ]
              }
            },
            {
              "name": "poolParams",
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      112,
                      111,
                      111,
                      108,
                      95,
                      112,
                      97,
                      114,
                      97,
                      109,
                      115
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "synthMint"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ]
              }
            },
            {
              "name": "stakePool"
            },
            {
              "name": "poolCollatAta",
              "docs": [
                "Our protocol’s LST‐denominated collateral ATA"
              ],
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "account",
                    "path": "poolState"
                  },
                  {
                    "kind": "account",
                    "path": "collatTokenProgram"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ],
                "program": {
                  "kind": "const",
                  "value": [
                    140,
                    151,
                    37,
                    143,
                    78,
                    36,
                    137,
                    241,
                    187,
                    61,
                    16,
                    41,
                    20,
                    142,
                    13,
                    131,
                    11,
                    90,
                    19,
                    153,
                    218,
                    255,
                    16,
                    132,
                    4,
                    142,
                    123,
                    216,
                    219,
                    233,
                    248,
                    89
                  ]
                }
              }
            },
            {
              "name": "rewardVault",
              "docs": [
                "Where we actually send “extracted” yield"
              ],
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "account",
                    "path": "poolParams"
                  },
                  {
                    "kind": "account",
                    "path": "collatTokenProgram"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ],
                "program": {
                  "kind": "const",
                  "value": [
                    140,
                    151,
                    37,
                    143,
                    78,
                    36,
                    137,
                    241,
                    187,
                    61,
                    16,
                    41,
                    20,
                    142,
                    13,
                    131,
                    11,
                    90,
                    19,
                    153,
                    218,
                    255,
                    16,
                    132,
                    4,
                    142,
                    123,
                    216,
                    219,
                    233,
                    248,
                    89
                  ]
                }
              }
            },
            {
              "name": "collatTokenProgram",
              "docs": [
                "SPL‐Token program for the collateral mint"
              ]
            },
            {
              "name": "collatMint",
              "docs": [
                "Collateral mint (needed both for CPI and for PDA seeds)"
              ]
            },
            {
              "name": "synthMint",
              "docs": [
                "Synth mint (only used to derive PDAs)"
              ]
            }
          ]
        },
        {
          "name": "poolMetricsCtx",
          "accounts": [
            {
              "name": "poolCollatAta",
              "docs": [
                "Pool’s collateral‐denominated ATA"
              ],
              "pda": {
                "seeds": [
                  {
                    "kind": "account",
                    "path": "read_price_ctx.pool_state",
                    "account": "readPriceCtx"
                  },
                  {
                    "kind": "account",
                    "path": "collatTokenProgram"
                  },
                  {
                    "kind": "account",
                    "path": "read_price_ctx.collat_mint",
                    "account": "readPriceCtx"
                  }
                ],
                "program": {
                  "kind": "const",
                  "value": [
                    140,
                    151,
                    37,
                    143,
                    78,
                    36,
                    137,
                    241,
                    187,
                    61,
                    16,
                    41,
                    20,
                    142,
                    13,
                    131,
                    11,
                    90,
                    19,
                    153,
                    218,
                    255,
                    16,
                    132,
                    4,
                    142,
                    123,
                    216,
                    219,
                    233,
                    248,
                    89
                  ]
                }
              }
            },
            {
              "name": "collatTokenProgram",
              "docs": [
                "SPL‐Token program for the collateral mint"
              ]
            },
            {
              "name": "readPriceCtx",
              "accounts": [
                {
                  "name": "poolState",
                  "docs": [
                    "PoolState PDA (stores prev_lst_supply, prev_stake_pool_lamports, etc.)"
                  ],
                  "pda": {
                    "seeds": [
                      {
                        "kind": "const",
                        "value": [
                          112,
                          111,
                          111,
                          108,
                          95,
                          115,
                          116,
                          97,
                          116,
                          101
                        ]
                      },
                      {
                        "kind": "account",
                        "path": "synthMint"
                      },
                      {
                        "kind": "account",
                        "path": "collatMint"
                      }
                    ]
                  }
                },
                {
                  "name": "poolParams",
                  "pda": {
                    "seeds": [
                      {
                        "kind": "const",
                        "value": [
                          112,
                          111,
                          111,
                          108,
                          95,
                          112,
                          97,
                          114,
                          97,
                          109,
                          115
                        ]
                      },
                      {
                        "kind": "account",
                        "path": "synthMint"
                      },
                      {
                        "kind": "account",
                        "path": "collatMint"
                      }
                    ]
                  }
                },
                {
                  "name": "collatMint"
                },
                {
                  "name": "synthMint"
                },
                {
                  "name": "refPriceUpdate"
                },
                {
                  "name": "collatPriceUpdate"
                },
                {
                  "name": "stakePool"
                }
              ]
            }
          ]
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "deposit",
      "discriminator": [
        242,
        35,
        198,
        137,
        82,
        225,
        242,
        182
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "collatMint"
        },
        {
          "name": "synthMint"
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "account",
                "path": "reward_extractor_ctx.pool_state",
                "account": "rewardsExtractorCtx"
              }
            ]
          }
        },
        {
          "name": "poolParams",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  95,
                  112,
                  97,
                  114,
                  97,
                  109,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "synthMint"
              },
              {
                "kind": "account",
                "path": "collatMint"
              }
            ]
          }
        },
        {
          "name": "signerCollatTokenAccount",
          "writable": true
        },
        {
          "name": "refPriceUpdate"
        },
        {
          "name": "collatPriceUpdate"
        },
        {
          "name": "collatTokenProgram"
        },
        {
          "name": "stakePool",
          "docs": [
            "CHECK 10. Stake Pool Account, from the SPL StakePool Program."
          ]
        },
        {
          "name": "rewardExtractorCtx",
          "accounts": [
            {
              "name": "poolState",
              "docs": [
                "PoolState PDA (stores prev_lst_supply, prev_stake_pool_lamports, etc.)"
              ],
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      112,
                      111,
                      111,
                      108,
                      95,
                      115,
                      116,
                      97,
                      116,
                      101
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "synthMint"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ]
              }
            },
            {
              "name": "poolParams",
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      112,
                      111,
                      111,
                      108,
                      95,
                      112,
                      97,
                      114,
                      97,
                      109,
                      115
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "synthMint"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ]
              }
            },
            {
              "name": "stakePool"
            },
            {
              "name": "poolCollatAta",
              "docs": [
                "Our protocol’s LST‐denominated collateral ATA"
              ],
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "account",
                    "path": "poolState"
                  },
                  {
                    "kind": "account",
                    "path": "collatTokenProgram"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ],
                "program": {
                  "kind": "const",
                  "value": [
                    140,
                    151,
                    37,
                    143,
                    78,
                    36,
                    137,
                    241,
                    187,
                    61,
                    16,
                    41,
                    20,
                    142,
                    13,
                    131,
                    11,
                    90,
                    19,
                    153,
                    218,
                    255,
                    16,
                    132,
                    4,
                    142,
                    123,
                    216,
                    219,
                    233,
                    248,
                    89
                  ]
                }
              }
            },
            {
              "name": "rewardVault",
              "docs": [
                "Where we actually send “extracted” yield"
              ],
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "account",
                    "path": "poolParams"
                  },
                  {
                    "kind": "account",
                    "path": "collatTokenProgram"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ],
                "program": {
                  "kind": "const",
                  "value": [
                    140,
                    151,
                    37,
                    143,
                    78,
                    36,
                    137,
                    241,
                    187,
                    61,
                    16,
                    41,
                    20,
                    142,
                    13,
                    131,
                    11,
                    90,
                    19,
                    153,
                    218,
                    255,
                    16,
                    132,
                    4,
                    142,
                    123,
                    216,
                    219,
                    233,
                    248,
                    89
                  ]
                }
              }
            },
            {
              "name": "collatTokenProgram",
              "docs": [
                "SPL‐Token program for the collateral mint"
              ]
            },
            {
              "name": "collatMint",
              "docs": [
                "Collateral mint (needed both for CPI and for PDA seeds)"
              ]
            },
            {
              "name": "synthMint",
              "docs": [
                "Synth mint (only used to derive PDAs)"
              ]
            }
          ]
        },
        {
          "name": "poolMetricsCtx",
          "accounts": [
            {
              "name": "poolCollatAta",
              "docs": [
                "Pool’s collateral‐denominated ATA"
              ],
              "pda": {
                "seeds": [
                  {
                    "kind": "account",
                    "path": "read_price_ctx.pool_state",
                    "account": "readPriceCtx"
                  },
                  {
                    "kind": "account",
                    "path": "collatTokenProgram"
                  },
                  {
                    "kind": "account",
                    "path": "read_price_ctx.collat_mint",
                    "account": "readPriceCtx"
                  }
                ],
                "program": {
                  "kind": "const",
                  "value": [
                    140,
                    151,
                    37,
                    143,
                    78,
                    36,
                    137,
                    241,
                    187,
                    61,
                    16,
                    41,
                    20,
                    142,
                    13,
                    131,
                    11,
                    90,
                    19,
                    153,
                    218,
                    255,
                    16,
                    132,
                    4,
                    142,
                    123,
                    216,
                    219,
                    233,
                    248,
                    89
                  ]
                }
              }
            },
            {
              "name": "collatTokenProgram",
              "docs": [
                "SPL‐Token program for the collateral mint"
              ]
            },
            {
              "name": "readPriceCtx",
              "accounts": [
                {
                  "name": "poolState",
                  "docs": [
                    "PoolState PDA (stores prev_lst_supply, prev_stake_pool_lamports, etc.)"
                  ],
                  "pda": {
                    "seeds": [
                      {
                        "kind": "const",
                        "value": [
                          112,
                          111,
                          111,
                          108,
                          95,
                          115,
                          116,
                          97,
                          116,
                          101
                        ]
                      },
                      {
                        "kind": "account",
                        "path": "synthMint"
                      },
                      {
                        "kind": "account",
                        "path": "collatMint"
                      }
                    ]
                  }
                },
                {
                  "name": "poolParams",
                  "pda": {
                    "seeds": [
                      {
                        "kind": "const",
                        "value": [
                          112,
                          111,
                          111,
                          108,
                          95,
                          112,
                          97,
                          114,
                          97,
                          109,
                          115
                        ]
                      },
                      {
                        "kind": "account",
                        "path": "synthMint"
                      },
                      {
                        "kind": "account",
                        "path": "collatMint"
                      }
                    ]
                  }
                },
                {
                  "name": "collatMint"
                },
                {
                  "name": "synthMint"
                },
                {
                  "name": "refPriceUpdate"
                },
                {
                  "name": "collatPriceUpdate"
                },
                {
                  "name": "stakePool"
                }
              ]
            }
          ]
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "getPrice",
      "discriminator": [
        238,
        38,
        193,
        106,
        228,
        32,
        210,
        33
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "readPriceCtx",
          "accounts": [
            {
              "name": "poolState",
              "docs": [
                "PoolState PDA (stores prev_lst_supply, prev_stake_pool_lamports, etc.)"
              ],
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      112,
                      111,
                      111,
                      108,
                      95,
                      115,
                      116,
                      97,
                      116,
                      101
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "synthMint"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ]
              }
            },
            {
              "name": "poolParams",
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      112,
                      111,
                      111,
                      108,
                      95,
                      112,
                      97,
                      114,
                      97,
                      109,
                      115
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "synthMint"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ]
              }
            },
            {
              "name": "collatMint"
            },
            {
              "name": "synthMint"
            },
            {
              "name": "refPriceUpdate"
            },
            {
              "name": "collatPriceUpdate"
            },
            {
              "name": "stakePool"
            }
          ]
        },
        {
          "name": "rewardExtractorCtx",
          "accounts": [
            {
              "name": "poolState",
              "docs": [
                "PoolState PDA (stores prev_lst_supply, prev_stake_pool_lamports, etc.)"
              ],
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      112,
                      111,
                      111,
                      108,
                      95,
                      115,
                      116,
                      97,
                      116,
                      101
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "synthMint"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ]
              }
            },
            {
              "name": "poolParams",
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      112,
                      111,
                      111,
                      108,
                      95,
                      112,
                      97,
                      114,
                      97,
                      109,
                      115
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "synthMint"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ]
              }
            },
            {
              "name": "stakePool"
            },
            {
              "name": "poolCollatAta",
              "docs": [
                "Our protocol’s LST‐denominated collateral ATA"
              ],
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "account",
                    "path": "poolState"
                  },
                  {
                    "kind": "account",
                    "path": "collatTokenProgram"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ],
                "program": {
                  "kind": "const",
                  "value": [
                    140,
                    151,
                    37,
                    143,
                    78,
                    36,
                    137,
                    241,
                    187,
                    61,
                    16,
                    41,
                    20,
                    142,
                    13,
                    131,
                    11,
                    90,
                    19,
                    153,
                    218,
                    255,
                    16,
                    132,
                    4,
                    142,
                    123,
                    216,
                    219,
                    233,
                    248,
                    89
                  ]
                }
              }
            },
            {
              "name": "rewardVault",
              "docs": [
                "Where we actually send “extracted” yield"
              ],
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "account",
                    "path": "poolParams"
                  },
                  {
                    "kind": "account",
                    "path": "collatTokenProgram"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ],
                "program": {
                  "kind": "const",
                  "value": [
                    140,
                    151,
                    37,
                    143,
                    78,
                    36,
                    137,
                    241,
                    187,
                    61,
                    16,
                    41,
                    20,
                    142,
                    13,
                    131,
                    11,
                    90,
                    19,
                    153,
                    218,
                    255,
                    16,
                    132,
                    4,
                    142,
                    123,
                    216,
                    219,
                    233,
                    248,
                    89
                  ]
                }
              }
            },
            {
              "name": "collatTokenProgram",
              "docs": [
                "SPL‐Token program for the collateral mint"
              ]
            },
            {
              "name": "collatMint",
              "docs": [
                "Collateral mint (needed both for CPI and for PDA seeds)"
              ]
            },
            {
              "name": "synthMint",
              "docs": [
                "Synth mint (only used to derive PDAs)"
              ]
            }
          ]
        }
      ],
      "args": []
    },
    {
      "name": "initializeAdmin",
      "discriminator": [
        35,
        176,
        8,
        143,
        42,
        160,
        61,
        158
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initializePool",
      "discriminator": [
        95,
        180,
        10,
        172,
        84,
        174,
        232,
        40
      ],
      "accounts": [
        {
          "name": "synthMint"
        },
        {
          "name": "collatMint",
          "docs": [
            "2. Collateral Mint"
          ]
        },
        {
          "name": "poolParams",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  95,
                  112,
                  97,
                  114,
                  97,
                  109,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "synthMint"
              },
              {
                "kind": "account",
                "path": "collatMint"
              }
            ]
          }
        },
        {
          "name": "poolState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "synthMint"
              },
              {
                "kind": "account",
                "path": "collatMint"
              }
            ]
          }
        },
        {
          "name": "poolCollatAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poolState"
              },
              {
                "kind": "account",
                "path": "collatTokenProgram"
              },
              {
                "kind": "account",
                "path": "collatMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "admin",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "collatTokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "stakePool"
        },
        {
          "name": "rewardVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "poolParams"
              },
              {
                "kind": "account",
                "path": "collatTokenProgram"
              },
              {
                "kind": "account",
                "path": "collatMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        }
      ],
      "args": [
        {
          "name": "collatFeedId",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "refFeedId",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    },
    {
      "name": "liquidate",
      "discriminator": [
        223,
        179,
        226,
        125,
        48,
        46,
        39,
        74
      ],
      "accounts": [
        {
          "name": "vault",
          "writable": true
        },
        {
          "name": "synthMint",
          "writable": true
        },
        {
          "name": "admin",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "collatMint"
        },
        {
          "name": "poolParams",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  95,
                  112,
                  97,
                  114,
                  97,
                  109,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "synthMint"
              },
              {
                "kind": "account",
                "path": "collatMint"
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "refPriceUpdate"
        },
        {
          "name": "collatPriceUpdate"
        },
        {
          "name": "signerSynthTokenAccount",
          "writable": true
        },
        {
          "name": "signerCollatTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "account",
                "path": "collatTokenProgram"
              },
              {
                "kind": "account",
                "path": "collatMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "collatTokenProgram"
        },
        {
          "name": "synthTokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "rewardExtractorCtx",
          "accounts": [
            {
              "name": "poolState",
              "docs": [
                "PoolState PDA (stores prev_lst_supply, prev_stake_pool_lamports, etc.)"
              ],
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      112,
                      111,
                      111,
                      108,
                      95,
                      115,
                      116,
                      97,
                      116,
                      101
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "synthMint"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ]
              }
            },
            {
              "name": "poolParams",
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      112,
                      111,
                      111,
                      108,
                      95,
                      112,
                      97,
                      114,
                      97,
                      109,
                      115
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "synthMint"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ]
              }
            },
            {
              "name": "stakePool"
            },
            {
              "name": "poolCollatAta",
              "docs": [
                "Our protocol’s LST‐denominated collateral ATA"
              ],
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "account",
                    "path": "poolState"
                  },
                  {
                    "kind": "account",
                    "path": "collatTokenProgram"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ],
                "program": {
                  "kind": "const",
                  "value": [
                    140,
                    151,
                    37,
                    143,
                    78,
                    36,
                    137,
                    241,
                    187,
                    61,
                    16,
                    41,
                    20,
                    142,
                    13,
                    131,
                    11,
                    90,
                    19,
                    153,
                    218,
                    255,
                    16,
                    132,
                    4,
                    142,
                    123,
                    216,
                    219,
                    233,
                    248,
                    89
                  ]
                }
              }
            },
            {
              "name": "rewardVault",
              "docs": [
                "Where we actually send “extracted” yield"
              ],
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "account",
                    "path": "poolParams"
                  },
                  {
                    "kind": "account",
                    "path": "collatTokenProgram"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ],
                "program": {
                  "kind": "const",
                  "value": [
                    140,
                    151,
                    37,
                    143,
                    78,
                    36,
                    137,
                    241,
                    187,
                    61,
                    16,
                    41,
                    20,
                    142,
                    13,
                    131,
                    11,
                    90,
                    19,
                    153,
                    218,
                    255,
                    16,
                    132,
                    4,
                    142,
                    123,
                    216,
                    219,
                    233,
                    248,
                    89
                  ]
                }
              }
            },
            {
              "name": "collatTokenProgram",
              "docs": [
                "SPL‐Token program for the collateral mint"
              ]
            },
            {
              "name": "collatMint",
              "docs": [
                "Collateral mint (needed both for CPI and for PDA seeds)"
              ]
            },
            {
              "name": "synthMint",
              "docs": [
                "Synth mint (only used to derive PDAs)"
              ]
            }
          ]
        },
        {
          "name": "poolMetricsCtx",
          "accounts": [
            {
              "name": "poolCollatAta",
              "docs": [
                "Pool’s collateral‐denominated ATA"
              ],
              "pda": {
                "seeds": [
                  {
                    "kind": "account",
                    "path": "read_price_ctx.pool_state",
                    "account": "readPriceCtx"
                  },
                  {
                    "kind": "account",
                    "path": "collatTokenProgram"
                  },
                  {
                    "kind": "account",
                    "path": "read_price_ctx.collat_mint",
                    "account": "readPriceCtx"
                  }
                ],
                "program": {
                  "kind": "const",
                  "value": [
                    140,
                    151,
                    37,
                    143,
                    78,
                    36,
                    137,
                    241,
                    187,
                    61,
                    16,
                    41,
                    20,
                    142,
                    13,
                    131,
                    11,
                    90,
                    19,
                    153,
                    218,
                    255,
                    16,
                    132,
                    4,
                    142,
                    123,
                    216,
                    219,
                    233,
                    248,
                    89
                  ]
                }
              }
            },
            {
              "name": "collatTokenProgram",
              "docs": [
                "SPL‐Token program for the collateral mint"
              ]
            },
            {
              "name": "readPriceCtx",
              "accounts": [
                {
                  "name": "poolState",
                  "docs": [
                    "PoolState PDA (stores prev_lst_supply, prev_stake_pool_lamports, etc.)"
                  ],
                  "pda": {
                    "seeds": [
                      {
                        "kind": "const",
                        "value": [
                          112,
                          111,
                          111,
                          108,
                          95,
                          115,
                          116,
                          97,
                          116,
                          101
                        ]
                      },
                      {
                        "kind": "account",
                        "path": "synthMint"
                      },
                      {
                        "kind": "account",
                        "path": "collatMint"
                      }
                    ]
                  }
                },
                {
                  "name": "poolParams",
                  "pda": {
                    "seeds": [
                      {
                        "kind": "const",
                        "value": [
                          112,
                          111,
                          111,
                          108,
                          95,
                          112,
                          97,
                          114,
                          97,
                          109,
                          115
                        ]
                      },
                      {
                        "kind": "account",
                        "path": "synthMint"
                      },
                      {
                        "kind": "account",
                        "path": "collatMint"
                      }
                    ]
                  }
                },
                {
                  "name": "collatMint"
                },
                {
                  "name": "synthMint"
                },
                {
                  "name": "refPriceUpdate"
                },
                {
                  "name": "collatPriceUpdate"
                },
                {
                  "name": "stakePool"
                }
              ]
            }
          ]
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "mint",
      "discriminator": [
        51,
        57,
        225,
        47,
        182,
        146,
        137,
        166
      ],
      "accounts": [
        {
          "name": "refPriceUpdate"
        },
        {
          "name": "collatPriceUpdate"
        },
        {
          "name": "poolParams",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  95,
                  112,
                  97,
                  114,
                  97,
                  109,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "synthMint"
              },
              {
                "kind": "account",
                "path": "collatMint"
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "signerCollatTokenAccount",
          "writable": true
        },
        {
          "name": "signerSynthAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "account",
                "path": "synthTokenProgram"
              },
              {
                "kind": "account",
                "path": "synthMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "collatMint"
        },
        {
          "name": "synthMint",
          "writable": true
        },
        {
          "name": "admin",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  100,
                  109,
                  105,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "collatTokenProgram"
        },
        {
          "name": "synthTokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "rewardExtractorCtx",
          "accounts": [
            {
              "name": "poolState",
              "docs": [
                "PoolState PDA (stores prev_lst_supply, prev_stake_pool_lamports, etc.)"
              ],
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      112,
                      111,
                      111,
                      108,
                      95,
                      115,
                      116,
                      97,
                      116,
                      101
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "synthMint"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ]
              }
            },
            {
              "name": "poolParams",
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      112,
                      111,
                      111,
                      108,
                      95,
                      112,
                      97,
                      114,
                      97,
                      109,
                      115
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "synthMint"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ]
              }
            },
            {
              "name": "stakePool"
            },
            {
              "name": "poolCollatAta",
              "docs": [
                "Our protocol’s LST‐denominated collateral ATA"
              ],
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "account",
                    "path": "poolState"
                  },
                  {
                    "kind": "account",
                    "path": "collatTokenProgram"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ],
                "program": {
                  "kind": "const",
                  "value": [
                    140,
                    151,
                    37,
                    143,
                    78,
                    36,
                    137,
                    241,
                    187,
                    61,
                    16,
                    41,
                    20,
                    142,
                    13,
                    131,
                    11,
                    90,
                    19,
                    153,
                    218,
                    255,
                    16,
                    132,
                    4,
                    142,
                    123,
                    216,
                    219,
                    233,
                    248,
                    89
                  ]
                }
              }
            },
            {
              "name": "rewardVault",
              "docs": [
                "Where we actually send “extracted” yield"
              ],
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "account",
                    "path": "poolParams"
                  },
                  {
                    "kind": "account",
                    "path": "collatTokenProgram"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ],
                "program": {
                  "kind": "const",
                  "value": [
                    140,
                    151,
                    37,
                    143,
                    78,
                    36,
                    137,
                    241,
                    187,
                    61,
                    16,
                    41,
                    20,
                    142,
                    13,
                    131,
                    11,
                    90,
                    19,
                    153,
                    218,
                    255,
                    16,
                    132,
                    4,
                    142,
                    123,
                    216,
                    219,
                    233,
                    248,
                    89
                  ]
                }
              }
            },
            {
              "name": "collatTokenProgram",
              "docs": [
                "SPL‐Token program for the collateral mint"
              ]
            },
            {
              "name": "collatMint",
              "docs": [
                "Collateral mint (needed both for CPI and for PDA seeds)"
              ]
            },
            {
              "name": "synthMint",
              "docs": [
                "Synth mint (only used to derive PDAs)"
              ]
            }
          ]
        },
        {
          "name": "poolMetricsCtx",
          "accounts": [
            {
              "name": "poolCollatAta",
              "docs": [
                "Pool’s collateral‐denominated ATA"
              ],
              "pda": {
                "seeds": [
                  {
                    "kind": "account",
                    "path": "read_price_ctx.pool_state",
                    "account": "readPriceCtx"
                  },
                  {
                    "kind": "account",
                    "path": "collatTokenProgram"
                  },
                  {
                    "kind": "account",
                    "path": "read_price_ctx.collat_mint",
                    "account": "readPriceCtx"
                  }
                ],
                "program": {
                  "kind": "const",
                  "value": [
                    140,
                    151,
                    37,
                    143,
                    78,
                    36,
                    137,
                    241,
                    187,
                    61,
                    16,
                    41,
                    20,
                    142,
                    13,
                    131,
                    11,
                    90,
                    19,
                    153,
                    218,
                    255,
                    16,
                    132,
                    4,
                    142,
                    123,
                    216,
                    219,
                    233,
                    248,
                    89
                  ]
                }
              }
            },
            {
              "name": "collatTokenProgram",
              "docs": [
                "SPL‐Token program for the collateral mint"
              ]
            },
            {
              "name": "readPriceCtx",
              "accounts": [
                {
                  "name": "poolState",
                  "docs": [
                    "PoolState PDA (stores prev_lst_supply, prev_stake_pool_lamports, etc.)"
                  ],
                  "pda": {
                    "seeds": [
                      {
                        "kind": "const",
                        "value": [
                          112,
                          111,
                          111,
                          108,
                          95,
                          115,
                          116,
                          97,
                          116,
                          101
                        ]
                      },
                      {
                        "kind": "account",
                        "path": "synthMint"
                      },
                      {
                        "kind": "account",
                        "path": "collatMint"
                      }
                    ]
                  }
                },
                {
                  "name": "poolParams",
                  "pda": {
                    "seeds": [
                      {
                        "kind": "const",
                        "value": [
                          112,
                          111,
                          111,
                          108,
                          95,
                          112,
                          97,
                          114,
                          97,
                          109,
                          115
                        ]
                      },
                      {
                        "kind": "account",
                        "path": "synthMint"
                      },
                      {
                        "kind": "account",
                        "path": "collatMint"
                      }
                    ]
                  }
                },
                {
                  "name": "collatMint"
                },
                {
                  "name": "synthMint"
                },
                {
                  "name": "refPriceUpdate"
                },
                {
                  "name": "collatPriceUpdate"
                },
                {
                  "name": "stakePool"
                }
              ]
            }
          ]
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "openVault",
      "discriminator": [
        181,
        248,
        228,
        67,
        6,
        175,
        37,
        167
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "collatMint"
        },
        {
          "name": "synthMint"
        },
        {
          "name": "poolState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "synthMint"
              },
              {
                "kind": "account",
                "path": "collatMint"
              }
            ]
          }
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "account",
                "path": "poolState"
              }
            ]
          }
        },
        {
          "name": "poolParams",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  95,
                  112,
                  97,
                  114,
                  97,
                  109,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "synthMint"
              },
              {
                "kind": "account",
                "path": "collatMint"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "maxExposurePct",
          "type": {
            "option": "u16"
          }
        }
      ]
    },
    {
      "name": "withdraw",
      "discriminator": [
        183,
        18,
        70,
        156,
        148,
        109,
        161,
        34
      ],
      "accounts": [
        {
          "name": "synthMint"
        },
        {
          "name": "collatMint"
        },
        {
          "name": "poolParams",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108,
                  95,
                  112,
                  97,
                  114,
                  97,
                  109,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "synthMint"
              },
              {
                "kind": "account",
                "path": "collatMint"
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "account",
                "path": "reward_extractor_ctx.pool_state",
                "account": "rewardsExtractorCtx"
              }
            ]
          }
        },
        {
          "name": "refPriceUpdate"
        },
        {
          "name": "collatPriceUpdate"
        },
        {
          "name": "signerCollatTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "account",
                "path": "collatTokenProgram"
              },
              {
                "kind": "account",
                "path": "collatMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "collatTokenProgram"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "rewardExtractorCtx",
          "accounts": [
            {
              "name": "poolState",
              "docs": [
                "PoolState PDA (stores prev_lst_supply, prev_stake_pool_lamports, etc.)"
              ],
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      112,
                      111,
                      111,
                      108,
                      95,
                      115,
                      116,
                      97,
                      116,
                      101
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "synthMint"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ]
              }
            },
            {
              "name": "poolParams",
              "pda": {
                "seeds": [
                  {
                    "kind": "const",
                    "value": [
                      112,
                      111,
                      111,
                      108,
                      95,
                      112,
                      97,
                      114,
                      97,
                      109,
                      115
                    ]
                  },
                  {
                    "kind": "account",
                    "path": "synthMint"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ]
              }
            },
            {
              "name": "stakePool"
            },
            {
              "name": "poolCollatAta",
              "docs": [
                "Our protocol’s LST‐denominated collateral ATA"
              ],
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "account",
                    "path": "poolState"
                  },
                  {
                    "kind": "account",
                    "path": "collatTokenProgram"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ],
                "program": {
                  "kind": "const",
                  "value": [
                    140,
                    151,
                    37,
                    143,
                    78,
                    36,
                    137,
                    241,
                    187,
                    61,
                    16,
                    41,
                    20,
                    142,
                    13,
                    131,
                    11,
                    90,
                    19,
                    153,
                    218,
                    255,
                    16,
                    132,
                    4,
                    142,
                    123,
                    216,
                    219,
                    233,
                    248,
                    89
                  ]
                }
              }
            },
            {
              "name": "rewardVault",
              "docs": [
                "Where we actually send “extracted” yield"
              ],
              "writable": true,
              "pda": {
                "seeds": [
                  {
                    "kind": "account",
                    "path": "poolParams"
                  },
                  {
                    "kind": "account",
                    "path": "collatTokenProgram"
                  },
                  {
                    "kind": "account",
                    "path": "collatMint"
                  }
                ],
                "program": {
                  "kind": "const",
                  "value": [
                    140,
                    151,
                    37,
                    143,
                    78,
                    36,
                    137,
                    241,
                    187,
                    61,
                    16,
                    41,
                    20,
                    142,
                    13,
                    131,
                    11,
                    90,
                    19,
                    153,
                    218,
                    255,
                    16,
                    132,
                    4,
                    142,
                    123,
                    216,
                    219,
                    233,
                    248,
                    89
                  ]
                }
              }
            },
            {
              "name": "collatTokenProgram",
              "docs": [
                "SPL‐Token program for the collateral mint"
              ]
            },
            {
              "name": "collatMint",
              "docs": [
                "Collateral mint (needed both for CPI and for PDA seeds)"
              ]
            },
            {
              "name": "synthMint",
              "docs": [
                "Synth mint (only used to derive PDAs)"
              ]
            }
          ]
        },
        {
          "name": "poolMetricsCtx",
          "accounts": [
            {
              "name": "poolCollatAta",
              "docs": [
                "Pool’s collateral‐denominated ATA"
              ],
              "pda": {
                "seeds": [
                  {
                    "kind": "account",
                    "path": "read_price_ctx.pool_state",
                    "account": "readPriceCtx"
                  },
                  {
                    "kind": "account",
                    "path": "collatTokenProgram"
                  },
                  {
                    "kind": "account",
                    "path": "read_price_ctx.collat_mint",
                    "account": "readPriceCtx"
                  }
                ],
                "program": {
                  "kind": "const",
                  "value": [
                    140,
                    151,
                    37,
                    143,
                    78,
                    36,
                    137,
                    241,
                    187,
                    61,
                    16,
                    41,
                    20,
                    142,
                    13,
                    131,
                    11,
                    90,
                    19,
                    153,
                    218,
                    255,
                    16,
                    132,
                    4,
                    142,
                    123,
                    216,
                    219,
                    233,
                    248,
                    89
                  ]
                }
              }
            },
            {
              "name": "collatTokenProgram",
              "docs": [
                "SPL‐Token program for the collateral mint"
              ]
            },
            {
              "name": "readPriceCtx",
              "accounts": [
                {
                  "name": "poolState",
                  "docs": [
                    "PoolState PDA (stores prev_lst_supply, prev_stake_pool_lamports, etc.)"
                  ],
                  "pda": {
                    "seeds": [
                      {
                        "kind": "const",
                        "value": [
                          112,
                          111,
                          111,
                          108,
                          95,
                          115,
                          116,
                          97,
                          116,
                          101
                        ]
                      },
                      {
                        "kind": "account",
                        "path": "synthMint"
                      },
                      {
                        "kind": "account",
                        "path": "collatMint"
                      }
                    ]
                  }
                },
                {
                  "name": "poolParams",
                  "pda": {
                    "seeds": [
                      {
                        "kind": "const",
                        "value": [
                          112,
                          111,
                          111,
                          108,
                          95,
                          112,
                          97,
                          114,
                          97,
                          109,
                          115
                        ]
                      },
                      {
                        "kind": "account",
                        "path": "synthMint"
                      },
                      {
                        "kind": "account",
                        "path": "collatMint"
                      }
                    ]
                  }
                },
                {
                  "name": "collatMint"
                },
                {
                  "name": "synthMint"
                },
                {
                  "name": "refPriceUpdate"
                },
                {
                  "name": "collatPriceUpdate"
                },
                {
                  "name": "stakePool"
                }
              ]
            }
          ]
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "admin",
      "discriminator": [
        244,
        158,
        220,
        65,
        8,
        73,
        4,
        65
      ]
    },
    {
      "name": "poolParams",
      "discriminator": [
        252,
        18,
        112,
        141,
        192,
        181,
        114,
        2
      ]
    },
    {
      "name": "poolState",
      "discriminator": [
        247,
        237,
        227,
        245,
        215,
        195,
        222,
        70
      ]
    },
    {
      "name": "priceUpdateV2",
      "discriminator": [
        34,
        241,
        35,
        99,
        157,
        126,
        244,
        205
      ]
    },
    {
      "name": "vault",
      "discriminator": [
        211,
        8,
        232,
        43,
        2,
        152,
        117,
        119
      ]
    }
  ],
  "events": [
    {
      "name": "adminInitialized",
      "discriminator": [
        237,
        223,
        71,
        11,
        140,
        218,
        196,
        171
      ]
    },
    {
      "name": "collateralDeposited",
      "discriminator": [
        244,
        62,
        77,
        11,
        135,
        112,
        61,
        96
      ]
    },
    {
      "name": "collateralWithdrawn",
      "discriminator": [
        51,
        224,
        133,
        106,
        74,
        173,
        72,
        82
      ]
    },
    {
      "name": "liquidationTriggered",
      "discriminator": [
        128,
        175,
        190,
        188,
        56,
        74,
        68,
        230
      ]
    },
    {
      "name": "mintInitialized",
      "discriminator": [
        46,
        171,
        107,
        161,
        175,
        104,
        236,
        230
      ]
    },
    {
      "name": "poolInitialized",
      "discriminator": [
        100,
        118,
        173,
        87,
        12,
        198,
        254,
        229
      ]
    },
    {
      "name": "purchaseExecuted",
      "discriminator": [
        119,
        106,
        168,
        136,
        190,
        113,
        126,
        104
      ]
    },
    {
      "name": "redeemExecuted",
      "discriminator": [
        71,
        65,
        43,
        216,
        175,
        156,
        151,
        205
      ]
    },
    {
      "name": "vaultClosed",
      "discriminator": [
        238,
        129,
        38,
        228,
        227,
        118,
        249,
        215
      ]
    },
    {
      "name": "vaultLiquidated",
      "discriminator": [
        17,
        195,
        67,
        17,
        198,
        246,
        82,
        63
      ]
    },
    {
      "name": "vaultOpened",
      "discriminator": [
        198,
        250,
        195,
        25,
        26,
        107,
        197,
        16
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "unauthorized",
      "msg": "Unauthorized operation."
    },
    {
      "code": 6001,
      "name": "withdrawAmountTooHigh",
      "msg": "Withdraw amount is too high."
    },
    {
      "code": 6002,
      "name": "incorrectLeverage",
      "msg": "Incorrect leverage."
    },
    {
      "code": 6003,
      "name": "incorrectFeedId",
      "msg": "Incorrect Price Feed Id."
    },
    {
      "code": 6004,
      "name": "incorrectCollatMint",
      "msg": "Incorrect Collat Mint."
    },
    {
      "code": 6005,
      "name": "collateralRatioTooLow",
      "msg": "Not enough collateral."
    },
    {
      "code": 6006,
      "name": "mathOverflow",
      "msg": "Math Overflow."
    },
    {
      "code": 6007,
      "name": "divisionByZero",
      "msg": "Division by Zero."
    },
    {
      "code": 6008,
      "name": "nonLiquidableVault",
      "msg": "The Vault is not liquidable."
    },
    {
      "code": 6009,
      "name": "notEnoughToken",
      "msg": "Not enough token available."
    },
    {
      "code": 6010,
      "name": "invalidPriceFeedId",
      "msg": "Price Feed Id is not valid."
    },
    {
      "code": 6011,
      "name": "priceFetchError",
      "msg": "Error fetching price."
    },
    {
      "code": 6012,
      "name": "invalidPriceData",
      "msg": "Invalide price data."
    },
    {
      "code": 6013,
      "name": "insufficientEquity",
      "msg": "Pool equity is insufficient."
    },
    {
      "code": 6014,
      "name": "bootstrapTooSmall",
      "msg": "First deposit amount should be at least 1 collateral token."
    },
    {
      "code": 6015,
      "name": "zeroDeposit",
      "msg": "Deposit amount should be greater than zero."
    },
    {
      "code": 6016,
      "name": "liquidationNotAllowed",
      "msg": "The Pool do not have any liquidable asset."
    },
    {
      "code": 6017,
      "name": "zeroNotAllowed",
      "msg": "This instruction require a non-zero amount."
    },
    {
      "code": 6018,
      "name": "liquidationAmountTooHigh",
      "msg": "The amount is bigger than the liquidable amount."
    },
    {
      "code": 6019,
      "name": "conversionError",
      "msg": "Not able to convert to requested type."
    },
    {
      "code": 6020,
      "name": "invalidPriceFeed",
      "msg": "Fallback price feed can only be the Shard 0."
    },
    {
      "code": 6021,
      "name": "publishTimeTooOld",
      "msg": "The Publish Time of the price feed is too old."
    },
    {
      "code": 6022,
      "name": "invalidZeroAmount",
      "msg": "The amount provided has to be greater than zero."
    },
    {
      "code": 6023,
      "name": "invalidTokenProgram",
      "msg": "The Token Program provided is invalid."
    },
    {
      "code": 6024,
      "name": "invalidAuthority",
      "msg": "Mint Authority must be set to Pool State PDA."
    },
    {
      "code": 6025,
      "name": "mintAmountExceedsLimit",
      "msg": "Requested amount to mint exceeds the current mintable amount."
    },
    {
      "code": 6026,
      "name": "insufficientPoolCollateral",
      "msg": "The pool doesn't hold enough collateral."
    },
    {
      "code": 6027,
      "name": "invalidPubkey",
      "msg": "The public key provided is invalid."
    },
    {
      "code": 6028,
      "name": "maxExposureTooHigh",
      "msg": "The maximum exposure provided is above the Pool ceiling."
    },
    {
      "code": 6029,
      "name": "maxExposureTooLow",
      "msg": "The maximum exposure provided is below the Pool floor."
    },
    {
      "code": 6030,
      "name": "insufficientAmount",
      "msg": "The amount value is insufficient."
    },
    {
      "code": 6031,
      "name": "vaultNotLiquidatable",
      "msg": "The Vault is not liquidatable."
    },
    {
      "code": 6032,
      "name": "liquidationAmountTooLow",
      "msg": "The amount provided for liquidation is too low."
    },
    {
      "code": 6033,
      "name": "invalidMintAuthority",
      "msg": "The Mint authority isn't valid."
    },
    {
      "code": 6034,
      "name": "invalidStakePoolState",
      "msg": "The provided StakePool State account isn't valid."
    },
    {
      "code": 6035,
      "name": "infaillible",
      "msg": "This error will never happen."
    }
  ],
  "types": [
    {
      "name": "admin",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "adminInitialized",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "governor",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "collateralDeposited",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "collateralWithdrawn",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "shares",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "liquidationTriggered",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pool",
            "type": "pubkey"
          },
          {
            "name": "liquidator",
            "type": "pubkey"
          },
          {
            "name": "synthAmount",
            "type": "u64"
          },
          {
            "name": "fairCollatAmount",
            "type": "u64"
          },
          {
            "name": "rewardCollaAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "mintInitialized",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "syntMint",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "poolInitialized",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "syntMint",
            "type": "pubkey"
          },
          {
            "name": "collatMint",
            "type": "pubkey"
          },
          {
            "name": "refFeedId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "collatFeedId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "liquidationThreshold",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "poolParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "type": "u8"
          },
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "collatMint",
            "type": "pubkey"
          },
          {
            "name": "synthMint",
            "type": "pubkey"
          },
          {
            "name": "collatFeedId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "refFeedId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "priceFactorSignif",
            "type": "u64"
          },
          {
            "name": "priceFactorExp",
            "type": "i32"
          },
          {
            "name": "collatPriceMaxAge",
            "type": "u64"
          },
          {
            "name": "refPriceMaxAge",
            "type": "u64"
          },
          {
            "name": "refFallbackMaxAge",
            "type": "u64"
          },
          {
            "name": "refFallbackKey",
            "type": "pubkey"
          },
          {
            "name": "minBootstrapAmount",
            "type": "u64"
          },
          {
            "name": "crLiquidationThreshold",
            "type": "u64"
          },
          {
            "name": "liquidationDiscount",
            "type": "u64"
          },
          {
            "name": "exposureFloorPct",
            "type": "u16"
          },
          {
            "name": "defaultMaxExposurePct",
            "type": "u16"
          },
          {
            "name": "exposureCeilPct",
            "type": "u16"
          },
          {
            "name": "isLstCollateral",
            "type": "bool"
          },
          {
            "name": "lstStakePool",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "poolState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "type": "u8"
          },
          {
            "name": "shares",
            "type": "u128"
          },
          {
            "name": "supply",
            "type": "u64"
          },
          {
            "name": "totalRealizedEquity",
            "type": "u64"
          },
          {
            "name": "maxExposurePctFp9",
            "type": "u64"
          },
          {
            "name": "lstSupply",
            "type": "u64"
          },
          {
            "name": "stakePoolLamports",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "priceFeedMessage",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "feedId",
            "docs": [
              "`FeedId` but avoid the type alias because of compatibility issues with Anchor's `idl-build` feature."
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "price",
            "type": "i64"
          },
          {
            "name": "conf",
            "type": "u64"
          },
          {
            "name": "exponent",
            "type": "i32"
          },
          {
            "name": "publishTime",
            "docs": [
              "The timestamp of this price update in seconds"
            ],
            "type": "i64"
          },
          {
            "name": "prevPublishTime",
            "docs": [
              "The timestamp of the previous price update. This field is intended to allow users to",
              "identify the single unique price update for any moment in time:",
              "for any time t, the unique update is the one such that prev_publish_time < t <= publish_time.",
              "",
              "Note that there may not be such an update while we are migrating to the new message-sending logic,",
              "as some price updates on pythnet may not be sent to other chains (because the message-sending",
              "logic may not have triggered). We can solve this problem by making the message-sending mandatory",
              "(which we can do once publishers have migrated over).",
              "",
              "Additionally, this field may be equal to publish_time if the message is sent on a slot where",
              "where the aggregation was unsuccesful. This problem will go away once all publishers have",
              "migrated over to a recent version of pyth-agent."
            ],
            "type": "i64"
          },
          {
            "name": "emaPrice",
            "type": "i64"
          },
          {
            "name": "emaConf",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "priceUpdateV2",
      "docs": [
        "A price update account. This account is used by the Pyth Receiver program to store a verified price update from a Pyth price feed.",
        "It contains:",
        "- `write_authority`: The write authority for this account. This authority can close this account to reclaim rent or update the account to contain a different price update.",
        "- `verification_level`: The [`VerificationLevel`] of this price update. This represents how many Wormhole guardian signatures have been verified for this price update.",
        "- `price_message`: The actual price update.",
        "- `posted_slot`: The slot at which this price update was posted."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "writeAuthority",
            "type": "pubkey"
          },
          {
            "name": "verificationLevel",
            "type": {
              "defined": {
                "name": "verificationLevel"
              }
            }
          },
          {
            "name": "priceMessage",
            "type": {
              "defined": {
                "name": "priceFeedMessage"
              }
            }
          },
          {
            "name": "postedSlot",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "purchaseExecuted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "signer",
            "type": "pubkey"
          },
          {
            "name": "synthAmount",
            "type": "u64"
          },
          {
            "name": "collatAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "redeemExecuted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "signer",
            "type": "pubkey"
          },
          {
            "name": "synthAmount",
            "type": "u64"
          },
          {
            "name": "collatAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "version",
            "type": "u8"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "maxExposurePct",
            "type": "u16"
          },
          {
            "name": "entryPnlAccum",
            "type": "i128"
          },
          {
            "name": "entryEquity",
            "type": "u64"
          },
          {
            "name": "shares",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "vaultClosed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "owner",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "vaultLiquidated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "liquidator",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "vaultOpened",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "maxExposurePct",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "verificationLevel",
      "docs": [
        "Pyth price updates are bridged to all blockchains via Wormhole.",
        "Using the price updates on another chain requires verifying the signatures of the Wormhole guardians.",
        "The usual process is to check the signatures for two thirds of the total number of guardians, but this can be cumbersome on Solana because of the transaction size limits,",
        "so we also allow for partial verification.",
        "",
        "This enum represents how much a price update has been verified:",
        "- If `Full`, we have verified the signatures for two thirds of the current guardians.",
        "- If `Partial`, only `num_signatures` guardian signatures have been checked.",
        "",
        "# Warning",
        "Using partially verified price updates is dangerous, as it lowers the threshold of guardians that need to collude to produce a malicious price update."
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "partial",
            "fields": [
              {
                "name": "numSignatures",
                "type": "u8"
              }
            ]
          },
          {
            "name": "full"
          }
        ]
      }
    }
  ]
};
