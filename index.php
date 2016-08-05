<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Space Explorer</title>
        <link href="assets/css/style.css" rel="stylesheet">
        <script type="text/javascript" src="assets/scripts/script.js" async></script>
        <!-- <script language="JavaScript" src="script.js" async>></script> -->
    </head>
    
    <body id="body">
        <section id="start_page">
            <h1 id="title">Space Explorer</h1>
            <p id="high_score"> High score : 0 </p>
            <button id="start_button"> START </button>
        </section>
        <section id="transition_page">
            <h1>Level : 2</h1>
            <p id="score"></p>
            <button id="start_level_2">NEXT</button>
        </section>

        <canvas id="main" width="1000" height="600">
            <!-- Place a warning here as a fallback for older browsers -->
        </canvas>
        <canvas id="blackhole" width="1000" height="600">
            <!-- Place a warning here as a fallback for older browsers -->
        </canvas>

    
    </body>
</html> 