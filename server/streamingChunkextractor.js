import { ChunkExtractor } from '@loadable/server'
import { assert } from 'chai'

function handleExtraProps(asset, extraProps) {
    return typeof extraProps === 'function' ? extraProps(asset) : extraProps
}

function extraPropsToString(asset, extraProps) {
    return Object.entries(handleExtraProps(asset, extraProps)).reduce(
        (acc, [key, value]) => `${acc} ${key}="${value}"`,
        '',
    )
}

function getSriHtmlAttributes(asset) {
    if (!asset.integrity) {
        return ''
    }
    return ` integrity="${asset.integrity}"`
}

function assetToScriptTag(asset, extraProps) {
    return `<script async data-chunk="${asset.chunk}" src="${asset.url
        }"${getSriHtmlAttributes(asset)}${extraPropsToString(
            asset,
            extraProps,
        )}></script>`
}

export class StreamingChunkExtractor extends ChunkExtractor {

    constructor(props) {
        super(props);
        this.seenChunks = [];
    }

    getLinkTagsSince(extraProps = {}) {
        const assets = this.getPreAssets()
        const linkTags = assets.map(asset => {
            if (!this.seenChunks.includes(asset.chunk.id)) {
                this.seenChunks.push(asset.chunk.id)
                return assetToLinkTag(asset, extraProps)
            }
            return ""
        })
        return joinTags(linkTags)
    }

    getScriptTagsSince(extraProps = {}) {
        const mainAssets = this.getMainAssets('script')
        const assetsScriptTags = mainAssets.map(asset =>{
            if (!this.seenChunks.includes(asset.chunk.id)) {
                this.seenChunks.push(asset.chunk.id)
                return assetToScriptTag(asset, extraProps)
            }
            return ""
        })
        return joinTags(assetsScriptTags)
    }

}
