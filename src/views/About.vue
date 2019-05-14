<template>
    <div class="about-main">
        <div class="about-upper--wrapper">
            <h1 headline class="pt-2 mt-5">What is it all about?</h1>
            <blockquote class="blockquote pr-5 pl-5 mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br/> Harum maiores
                modi quidem veniam, expedita quis laboriosam.
            </blockquote>
        </div>
        <div class="about-under--wrapper">
            <blockquote class="blockquote pr-5 pl-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi
                quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti
                asperiores rem nemo numquam fuga ab at.
            </blockquote>
        </div>
    </div>
</template>


<style lang="scss">
    .about-main {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .about-upper--wrapper {
        background-color: #696a6b;
        background-image: -webkit-linear-gradient(30deg, #464749 50%, #505050 50%);
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        color: white;
        font-size: 13px;
        min-height: 50%;
        @media (min-width: $breakpoint-small) {
            display: flex;
            flex-direction: column;
            text-align: center;
            justify-content: center;
            min-height: 50%;

        }
    }
    .blockquote {
        font-size: 17px;
        @media (min-width: $breakpoint-small) {
        max-width: 1132px;
        margin: 0 auto;
            font-size: 18px;
        }
    }

    .about-under--wrapper {
        background-color: #8d8c93;
        background-image: -webkit-linear-gradient(150deg, #828282 35%, #888888 35%);
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        color: white;
        font-size: 13px;
        min-height: 50%;
        @media (min-width: $breakpoint-small) {
            min-height: 50%;
        }
    }
</style>