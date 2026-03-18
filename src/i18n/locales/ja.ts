export default {
    nav: {
      products: '製品',
      performance: 'パフォーマンス',
      countdown: 'カウントダウン',
      reservation: '予約',
    },
    hero: {
      title: '精度を再定義する。',
      description:
        '次世代の周辺機器は、スピード・コントロール・超軽量パフォーマンスのために設計されています。限界を取り払い、すべての動きを強化します。',
      primaryButtonText: 'コレクションを見る',
      secondaryButtonText: '哲学を見る',
    },
    marquee: {
        items: [
          '精密設計',
          '妥協なき品質',
          'エリートハードウェア',
          'ゲーミングの未来',
        ],
      },
      productSlider: {
        slides: [
          {
            id: 2,
            eyebrow: 'ミニマルデザイン',
            title: 'Nebula X Ultralight',
            description:
              '最大限の通気性、精密なコントロール、そして次世代のパフォーマンスを実現するために、スケルトン構造で設計された未来的な超軽量ゲーミングマウスです。',
            features: [
              'スケルトンハニカムデザイン',
              'アダプティブRGBコア',
              'エルゴノミックフロー形状',
            ],
            buttonText: 'デザインを見る',
            modelSrc: 'futuristic_gaming_mouse.glb',
            modelAlt: 'Aura Air 3Dモデル',
            specs: {
              title: 'Aura Air',
              subtitle: 'デザインと人間工学',
              sections: [
                {
                  label: 'センサー',
                  value: '32,000 DPI クアンタム光学センサー',
                  description: '800 IPS トラッキング速度、75G 加速度',
                },
                {
                  label: 'バッテリー寿命',
                  value: '最大120時間',
                  description: 'スマート電力最適化 + USB-C 急速充電',
                },
                {
                  label: 'サイズ',
                  value: '122 x 63 x 37 mm',
                  description: 'つかみ持ちとハイブリッドグリップ向け設計',
                },
                {
                  label: '重量',
                  value: '42グラム',
                  description: '超軽量構造',
                },
              ],
            },
          },
          {
            id: 1,
            eyebrow: '精密設計',
            title: 'Aura Pro Wireless',
            description:
              '競技環境において、精度・スピード・超軽量の快適性を実現するために設計された高性能ワイヤレスゲーミングマウスです。',
            features: [
              '超軽量デザイン',
              '高精度トラッキング',
              '長時間バッテリー',
            ],
            buttonText: '仕様を見る',
            modelSrc: 'mouse_gamer.glb',
            modelAlt: 'Aura Pro 3Dモデル',
            specs: {
              title: 'Aura Pro Wireless',
              subtitle: '技術仕様',
              sections: [
                {
                  label: 'センサー',
                  value: '30,000 DPI 光学センサー',
                  description: '750 IPS トラッキング速度、70G 加速度',
                },
                {
                  label: '重量',
                  value: '48グラム',
                  description: '超軽量マグネシウム合金シャーシ',
                },
                {
                  label: 'バッテリー寿命',
                  value: '最大150時間',
                  description: 'USB-C 急速充電対応',
                },
                {
                  label: 'サイズ',
                  value: '124 x 64 x 38 mm',
                  description: 'つまみ持ちとつかみ持ち向けに最適化',
                },
              ],
            },
          },
          {
            id: 3,
            eyebrow: 'エリートハードウェア',
            title: 'VoidMesh S1',
            description:
              '通気性の高い快適さと、スピード・コントロールを両立するために設計された、パンチングシェル構造の洗練された超軽量ゲーミングマウスです。',
            features: [
              'パンチングシェルデザイン',
              'ステルスパフォーマンスモード',
              '高精度スクロールコントロール',
            ],
            buttonText: '詳細を見る',
            modelSrc: '3d_lightweight_gaming_mouse_-_high_poly.glb',
            modelAlt: 'Aura X 3Dモデル',
            specs: {
              title: 'Aura X',
              subtitle: 'エリートハードウェア',
              sections: [
                {
                  label: 'センサー',
                  value: '26,000 DPI 高精度光学センサー',
                  description: '650 IPS トラッキング速度、60G 加速度',
                },
                {
                  label: '重量',
                  value: '49グラム',
                  description: '軽量強化ポリマーシェル',
                },
                {
                  label: 'バッテリー',
                  value: '最大100時間',
                  description: 'USB-C 急速充電対応',
                },
                {
                  label: 'サイズ',
                  value: '123 x 61 x 39 mm',
                  description: 'つまみ持ちとつかみ持ち向けに最適化',
                },
              ],
            },
          },
        ],
      },
      featuresSection: {
        title: '最高のパフォーマンスのために設計',
        description:
          'あらゆる動きにおいて、スピード・コントロール・安定性を向上させるために設計された精密機能。',
        features: [
          {
            icon: 'bolt',
            title: '超低遅延レスポンス',
            description:
              '競技向けに最適化されたワイヤレス技術により、ほぼ瞬時の入力とゼロ遅延を実現します。',
          },
          {
            icon: 'tune',
            title: '完全なカスタマイズ制御',
            description:
              '感度からボタンマッピングまで、すべてを細かく調整し、自分だけの最適な設定を構築できます。',
          },
          {
            icon: 'auto_awesome',
            title: 'インテリジェントパフォーマンスシステム',
            description:
              '高度なオンボード処理がリアルタイムで適応し、あらゆる状況で安定した精度と効率を提供します。',
          },
        ],
      },
      btnModal: {
        text: '詳細を閉じる',
      },
      btnExplore: {
        text: 'デザインを見る',
      },
      countdownSection: {
        eyebrow: 'イベントホライズン',
        title: 'まもなくローンチ。',
        labels: {
          days: '日',
          hours: '時間',
          minutes: '分',
          seconds: '秒',
        },
      },
      reservationSection: {
        eyebrow: '限定在庫',
        title: '今すぐ確保。',
        description:
          'Aura Pro 周辺機器の次回ロットは最終テスト段階に入っています。一般公開前にハードウェアを確保するため、優先予約リストにご参加ください。',
        statusText: '生産フェーズ4',
        locationText: '東京ラボ',
        titleText: '氏名',
        emailText: '勤務先メール',
        hardwareText: 'ハードウェア選択',
        selectText: '製品を選択',
        submitText: '今すぐ予約',
        termsText: '予約することで、優先アクセス規約に同意したものとみなされます。',
        productOptions: [
          { label: 'Nebula X Ultralight', value: 'nebula-x-ultralight' },
          { label: 'Aura Pro Wireless', value: 'aura-pro-wireless' },
          { label: 'VoidMesh S1', value: 'voidmesh-s1' },
        ],
      },
      footer: {
        copyright: '© 2025 Aura Gaming Tech。東京で設計。',
      }
  }