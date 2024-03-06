export class Sticky {
    section: HTMLElement
    stepSlider: HTMLElement
    stepWindow: HTMLElement
    steps: NodeListOf<HTMLElement>
    controls: NodeListOf<HTMLElement>
    
    containerTop: number
    gapTop: number
    sliderHeight: number
    triggerTop: number
    triggerBottom: number
    controlHeight: number
    constructor(groupName: string) {
        this.section = document.querySelector(`[data-${groupName}]`)
        this.stepSlider = this.section.querySelector(`[data-${groupName}-wrapper]`)
        this.stepWindow = this.section.querySelector(`[data-${groupName}-window]`)
        this.steps = this.section.querySelectorAll(`[data-${groupName}-step]`)
        this.controls = this.section.querySelectorAll(`[data-${groupName}-img]`)
        
        this.checkPosition = this.checkPosition.bind(this)
        this.styleSetup = this.styleSetup.bind(this)
        document.addEventListener('load', this.checkPosition)
        document.addEventListener('scroll', this.checkPosition)
        document.addEventListener('resize', this.styleSetup)
        
        this.run()
    }

    run() {
        // wait for page to be fully loaded
        const pageLoaded = setInterval(() => {
            if (document.readyState === 'complete') {
                clearInterval(pageLoaded)
                this.styleSetup()
                this.checkPosition()
            }
        }, 10);
    }
    
    styleSetup() {
        this.stepSlider.style.position = 'relative'
        this.containerTop = this.stepSlider.offsetTop
        this.sliderHeight = this.getStepWrapperHeight()
        this.controlHeight = this.getControlHeight()
        this.gapTop = this.getGapTop()
        this.triggerTop = this.getTriggerTop()
        this.triggerBottom = this.getTriggerBottom()
        
        this.section.style.minHeight = `${window.innerHeight}px`
        this.stepWindow.style.height = `${this.controlHeight}px`
        this.steps.forEach(step => {
            step.style.display = 'flex'
            step.style.flexDirection = 'column'
            step.style.justifyContent = 'flex-end'
        })
        this.section.style.padding = `${this.gapTop}px 0`
    }
    
    getStepWrapperHeight() {
        return this.stepSlider.getBoundingClientRect().height
    }

    getControlHeight() {
        const controlSizes : number[] = []
        this.controls.forEach(control => controlSizes.push(control.getBoundingClientRect().height))
        return controlSizes.sort((a, b) => a - b)[controlSizes.length - 1]
    }

    getGapTop() {
        const windowInnerHeight = window.innerHeight
        const controlHeightSum = this.controlHeight * this.controls.length
        const gap = this.sliderHeight - controlHeightSum

        return controlHeightSum > windowInnerHeight ? 80 : gap
    }
    
    getTriggerTop() {
        return this.containerTop + this.stepWindow.offsetTop - this.gapTop
    }

    getTriggerBottom() {
        return this.containerTop + this.sliderHeight - this.controlHeight - this.gapTop
    }
    
    checkPosition() {
        const windowScroll = window.scrollY
        
        const isScrollAfterElementTop = windowScroll >= this.triggerTop && windowScroll <= this.triggerBottom
        const isScrollAfterElementEnd = windowScroll > this.triggerBottom
        const transform = isScrollAfterElementTop ?
            windowScroll - this.triggerTop :
            isScrollAfterElementEnd ?
                this.triggerBottom - this.triggerTop :
                0
        
        this.stepWindow.style.transform = `translateY(${transform}px)`
    }
}

//adicionar um destroy
