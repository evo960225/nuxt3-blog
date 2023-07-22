import { defineConfig } from 'unocss'
import { presetAttributify, transformerDirectives } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import presetWind from '@unocss/preset-wind'

export default defineConfig({
  presets: [
    presetWind(),
    presetAttributify(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ]
})