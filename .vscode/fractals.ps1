```powershell
Add-Type -AssemblyName System.Windows.Forms

# Create a form
$form = New-Object System.Windows.Forms.Form
$form.Text = "Fractal Art Generator"
$form.Size = New-Object System.Drawing.Size(400, 300)
$form.StartPosition = "CenterScreen"

# Create a button to generate fractal art
$btnGenerate = New-Object System.Windows.Forms.Button
$btnGenerate.Location = New-Object System.Drawing.Point(50, 50)
$btnGenerate.Size = New-Object System.Drawing.Size(100, 30)
$btnGenerate.Text = "Generate Fractal"
$btnGenerate.Add_Click({
    # Place your fractal generation logic here
    # For simplicity, let's just display a message box
    [System.Windows.Forms.MessageBox]::Show("Fractal art generated!")
})
$form.Controls.Add($btnGenerate)

# Create a label for instructions
$lblInstructions = New-Object System.Windows.Forms.Label
$lblInstructions.Location = New-Object System.Drawing.Point(50, 100)
$lblInstructions.Size = New-Object System.Drawing.Size(300, 50)
$lblInstructions.Text = "Click the button to generate fractal art"
$form.Controls.Add($lblInstructions)

# Display the form
$form.ShowDialog() | Out-Null
```